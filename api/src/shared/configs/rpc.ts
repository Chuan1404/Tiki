import dotenv from 'dotenv'

if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
export const rpc = {
    authURL: process.env.AUTH_SERVICE_URL,
    userURL: process.env.USER_SERVICE_URL,
    categoryURL: process.env.CATEGORY_SERVICE_URL,
    brandURL: process.env.BRAND_SERVICE_URL,
    productURL: process.env.PRODUCT_SERVICE_URL,
    cartURL: process.env.CART_SERVICE_URL,
};
