import dotenv from "dotenv";

dotenv.config();

export const rpc = {
  productCategory:
    process.env.RPC_PRODUCT_CATEGORY_URL ?? "http://localhost:3001",
  productBrand: process.env.RPC_PRODUCT_BRAND_URL ?? "http://localhost:3001",
  cartProduct: process.env.RPC_CART_PRODUCT_URL ?? "http://localhost:3001",
  userToken: process.env.RPC_USER_TOKEN_URL ?? "http://localhost:3001",
};
