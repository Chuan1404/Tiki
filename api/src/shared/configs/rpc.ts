import dotenv from "dotenv";

dotenv.config();

export const rpc = {
    authURL: process.env.AUTH_SERVICE_URL ?? "http://localhost:3000",
    userURL: process.env.USER_SERVICE_URL ?? "http://localhost:3001",
    categoryURL: process.env.CATEGORY_SERVICE_URL ?? "http://localhost:3002",
    brandURL: process.env.BRAND_SERVICE_URL ?? "http://localhost:3003",
    productURL: process.env.PRODUCT_SERVICE_URL ?? "http://localhost:3004",
    cartURL: process.env.CART_SERVICE_URL ?? "http://localhost:3005",
};
