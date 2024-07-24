/*
  Warnings:

  - You are about to drop the column `defaultBillingAddressId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `defaultShippingAddressId` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "defaultBillingAddressId",
DROP COLUMN "defaultShippingAddressId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "defaultBillingAddressId" INTEGER,
ADD COLUMN     "defaultShippingAddressId" INTEGER;
