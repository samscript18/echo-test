import express, { Express } from "express";
import secrets from "./constants/secrets.const";
import { rootRouter } from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/error";

const app: Express = express();

app.use(express.json());
app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({}).$extends({
  result: {
    address: {
      formattedAddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true,
        },
        compute: (addr) => {
          return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country} - ${addr.pincode}`;
        },
      },
    },
  },
});

app.use(errorMiddleware);

const port = secrets.port;
app.listen(port, () => {
  console.log(`⚡[server]: connected successfully on http://localhost:${port}`);
});
