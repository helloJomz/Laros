import dotenv from "dotenv";

dotenv.config();

export const CONNECTION: string = process.env.MONGODBCREDENTIALS!;
export const PORT: string | number = process.env._PORT || 3000;

export const APIKEY: string = process.env.GIANTBOMB_API_KEY2!;
export const SALT: number = 10;

export const ACCESS_SECRET: string = process.env.ACCESS_SECRET_TOKEN!;
export const REFRESH_SECRET: string = process.env.REFRESH_SECRET_TOKEN!;

export const ACCESS_TOKEN_STRING: string = "gqeRxt3B9mZ2i";
export const REFRESH_TOKEN_STRING: string = "ui9832mmXk21";

export const GIPHY_APIKEY: string = process.env.GIPHY_API_KEY!;
export const GIPHY_APIKEY2: string = process.env.GIPHY_API_KEY2!;
