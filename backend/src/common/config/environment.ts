import * as dotenv from "dotenv";
dotenv.config();

export const ENVIRONMENT = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: process.env.PORT || 3000,
    ENV: process.env.APP_ENV,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  ENCRYPTION: {
    REFRESH_TOKEN_ENCRYPTION_KEY: process.env.REFRESH_TOKEN_ENCRYPTION_KEY,
    PRIVATE_KEY_ENCRYPTION_KEY: process.env.PRIVATE_KEY_ENCRYPTION_KEY,
  },
  DB: {
    URL: process.env.DB_URL,
  },
};
