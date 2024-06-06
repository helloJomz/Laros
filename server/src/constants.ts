import dotenv from "dotenv";

dotenv.config();

export const CONNECTION: string = process.env.MONGODBCREDENTIALS!;
export const PORT: string | number = process.env._PORT || 3000;

export const APIKEY: string = process.env.GIANTBOMB_API_KEY2!;
export const SALT: number = 10;

export const ACCESS_SECRET = process.env.ACCESS_SECRET_TOKEN;
export const REFRESH_SECRET = process.env.REFRESH_SECRET_TOKEN;

export const ACCESS_TOKEN_STRING = "gqeRxt3B9mZ2i";
export const REFRESH_TOKEN_STRING = "ui9832mmXk21";
