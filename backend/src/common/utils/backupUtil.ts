import { google } from "googleapis";
import { v4 as uuidv4 } from "uuid";
import { Backup } from "../../modules/schemas/backup.collection";
import { Schema } from "mongoose";
import { ENVIRONMENT } from "../config/environment";
const APP_NAME = ENVIRONMENT.APP.NAME;

export class BackupUtil {
  private oauth2Client;

  constructor(refreshToken: string, os: string) {
    this.oauth2Client = new google.auth.OAuth2(
      `${process.env.GOOGLE_CLIENT_ID}_${String(os).toUpperCase()}`,
      process.env.GOOGLE_CLIENT_SECRET,
      "http://localhost:3000/auth/google/callback"
    );

    this.oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });
  }

  private encodeToBase64(text: string): string {
    return Buffer.from(text).toString("base64");
  }

  private decodeFromBase64(base64String: string): string {
    return Buffer.from(base64String, "base64").toString("utf-8");
  }

  public async createBackup(userId: string, privateKey: string) {
    const jsonFile = {
      key: this.encodeToBase64(privateKey),
    };

    const backupId = uuidv4();
    const folderName = `DO_NOT_DELETE_${APP_NAME}_ACCOUNT_BACKUP_FOLDER_${backupId}`;
    const fileName = `${backupId}.json`;

    try {
      // Create a private folder
      const folder = await google
        .drive({ version: "v3", auth: this.oauth2Client })
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
        .drive({ version: "v3", auth: this.oauth2Client })
        .files.create({
          requestBody: {
            name: fileName,
            mimeType: "application/json",
            parents: [folder.data.id],
          },
          media: {
            mimeType: "application/json",
            body: JSON.stringify(jsonFile),
          },
          fields: "id",
        });

      if (!file.data.id) {
        throw new Error("Failed to create file");
      }

      // Save backup details to database
      const backup = new Backup({
        user: userId,
        backupId,
        fileId: file.data.id,
        folderId: folder.data.id,
      });

      await backup.save();

      return backup;
    } catch (error) {
      console.error("Backup creation failed:", error);
      throw error;
    }
  }

  public async readBackup(fileId: string): Promise<string | undefined> {
    try {
      const file = await google
        .drive({ version: "v3", auth: this.oauth2Client })
        .files.get({
          fileId: fileId,
          alt: "media",
        });

      const jsonData = file.data as { privateKey: string };
      return this.decodeFromBase64(jsonData.privateKey);
    } catch (error) {
      console.error("Failed to read backup:", error);
      throw error;
    }
  }

  public async deleteBackup(folderId: string): Promise<void> {
    try {
      await google
        .drive({ version: "v3", auth: this.oauth2Client })
        .files.delete({
          fileId: folderId,
        });
    } catch (error) {
      console.error("Failed to delete backup:", error);
      throw error;
    }
  }
}
