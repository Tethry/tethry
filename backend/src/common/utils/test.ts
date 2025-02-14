import { google } from "googleapis";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const refreshToken =
  "1//03jlC72gdU0EeCgYIARAAGAMSNwF-L9IrN2q2vzcXYYJe2kotKgZUk8Ptzvn3g8FaPcugFSTYxU7wU4WGyfqqGetAByCVCLcqtTE";

const oauth2Client = new google.auth.OAuth2(
  "148035758807-e5irm86vc9qa0unlk4a883srukhf8vfq.apps.googleusercontent.com",
  "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",
  "http://localhost:3000/auth/google/callback"
);

const getRefreshToken = async (authCode: string) => {
  try {
    const { tokens } = await oauth2Client.getToken(authCode);
    console.log("Refresh Token:", tokens.refresh_token);
    return tokens.refresh_token;
  } catch (error) {
    console.error("Error getting refresh token:", error);
    throw error;
  }
};

oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

export const encodeToBase64 = (text: string): string => {
  return Buffer.from(text).toString("base64");
};

export const decodeFromBase64 = (base64String: string): string => {
  return Buffer.from(base64String, "base64").toString("utf-8");
};

export const createJsonFile = async (privateKey: string) => {
  const jsonFile = {
    privateKey: encodeToBase64(privateKey),
  };

  const folderName = `DO_NOT_DELETE_TETHRY_ACCOUNT_BACKUP_FOLDER_${uuidv4()}`;
  const jsonFileName = `${uuidv4()}.json`;

  try {
    // Create a private folder
    const folder = await google
      .drive({ version: "v3", auth: oauth2Client })
      .files.create({
        requestBody: {
          name: folderName,
          mimeType: "application/vnd.google-apps.folder",
        },
        fields: "id",
      });

    if (!folder.data.id) {
      throw new Error("Failed to create folder");
    }

    // Create JSON file with encoded private key
    const file = await google
      .drive({ version: "v3", auth: oauth2Client })
      .files.create({
        requestBody: {
          name: jsonFileName,
          mimeType: "application/json",
          parents: [folder.data.id!],
        },
        media: {
          mimeType: "application/json",
          body: JSON.stringify(jsonFile),
        },
        fields: "id",
      });

    console.log("File created with ID:", file.data.id);
    return file.data.id;
  } catch (error) {
    console.error(error);
  }
};

export const readJsonFile = async (fileId: string) => {
  try {
    const file = await google
      .drive({ version: "v3", auth: oauth2Client })
      .files.get({
        fileId: fileId,
        alt: "media",
      });

    const jsonData = file.data as { privateKey: string };
    const decodedPrivateKey = decodeFromBase64(jsonData.privateKey);

    console.log("Decoded private key:", decodedPrivateKey);
    return decodedPrivateKey;
  } catch (error) {
    console.error(error);
  }
};
