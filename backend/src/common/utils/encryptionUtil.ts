import CryptoJS from "crypto-js";
import { ENVIRONMENT } from "../config/environment";

const ENCRYPTION_KEY = ENVIRONMENT.ENCRYPTION.PRIVATE_KEY_ENCRYPTION_KEY;
const REFRESH_TOKEN_ENCRYPTION_KEY =
  ENVIRONMENT.ENCRYPTION.REFRESH_TOKEN_ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
  throw new Error("ENCRYPTION_KEY is not set");
}

if (!REFRESH_TOKEN_ENCRYPTION_KEY) {
  throw new Error("REFRESH_TOKEN_ENCRYPTION_KEY is not set");
}

export const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decrypt = (data: string) => {
  return CryptoJS.AES.decrypt(data, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
};

export const encryptRefreshToken = (data: string) => {
  return CryptoJS.AES.encrypt(data, REFRESH_TOKEN_ENCRYPTION_KEY).toString();
};

export const decryptRefreshToken = (data: string) => {
  return CryptoJS.AES.decrypt(data, REFRESH_TOKEN_ENCRYPTION_KEY).toString(
    CryptoJS.enc.Utf8
  );
};
