import dotenv from "dotenv";

dotenv.config();

export const rpc = {
  productCategory:
    process.env.RPC_PRODUCT_CATEGORY_URL ?? "http://localhost:3001",
  productBrand: process.env.RPC_PRODUCT_BRAND_URL ?? "http://localhost:3001",
};
