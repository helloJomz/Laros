import { config } from "dotenv";

config();

export const CONNECTION: string = process.env.MONGODBCREDENTIALS!;
export const PORT: string | number = process.env._PORT || 3000;

export const APIKEY: string = process.env.GIANTBOMB_API_KEY2!;
export const SALT: number = 10;

export const GIPHY_APIKEY: string = process.env.GIPHY_API_KEY!;
export const GIPHY_APIKEY2: string = process.env.GIPHY_API_KEY2!;

export const GOOGLE_STORAGE_PROJECT_ID: string =
  process.env.GOOGLE_STORAGE_PROJECT_ID!;
export const GOOGLE_STORAGE_KEY: string = process.env.GOOGLE_STORAGE_KEY!;
export const GOOGLE_STORAGE_BUCKET_NAME: string =
  process.env.GOOGLE_STORAGE_BUCKET_NAME!;
