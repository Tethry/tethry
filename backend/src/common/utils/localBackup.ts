import { v4 as uuidv4 } from "uuid";
import { Backup } from "../../modules/schemas/backup.collection";
import { Schema } from "mongoose";
import { ENVIRONMENT } from "../config/environment";
import fs from "fs/promises";
import path from "path";

const APP_NAME = ENVIRONMENT.APP.NAME;
const DRIVE_ROOT = path.join(process.cwd(), "DRIVE_SIMULATION");

export class LocalBackup {
  constructor() {
    // Initialize drive directory when instance is created
    this.initializeDriveDirectory().catch((err) => {
      console.error("Failed to initialize drive directory:", err);
    });
  }

  private async initializeDriveDirectory() {
    try {
      // Create the DRIVE_SIMULATION directory with recursive option
      await fs.mkdir(DRIVE_ROOT, { recursive: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
        throw error;
      }
    }
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
      // Ensure the DRIVE_SIMULATION directory exists before creating the backup
      await this.initializeDriveDirectory();

      // Create backup folder with recursive option
      const folderPath = path.join(DRIVE_ROOT, folderName);
      await fs.mkdir(folderPath, { recursive: true });

      // Create and write JSON file
      const filePath = path.join(folderPath, fileName);
      await fs.writeFile(filePath, JSON.stringify(jsonFile, null, 2), "utf-8");

      // Save backup details to database
      const backup = new Backup({
        user: userId,
        backupId,
        fileId: fileName,
        folderId: folderName,
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
      // Ensure the DRIVE_SIMULATION directory exists before reading
      await this.initializeDriveDirectory();

      // Find the folder containing the file
      const folders = await fs.readdir(DRIVE_ROOT);
      const folder = folders.find((f) =>
        f.includes(fileId.replace(".json", ""))
      );

      if (!folder) {
        throw new Error("Backup folder not found");
      }

      // Read and parse the file
      const filePath = path.join(DRIVE_ROOT, folder, fileId);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent);

      return this.decodeFromBase64(jsonData.key);
    } catch (error) {
      console.error("Failed to read backup:", error);
      throw error;
    }
  }

  public async deleteBackup(folderId: string): Promise<void> {
    try {
      const folderPath = path.join(DRIVE_ROOT, folderId);
      await fs.rm(folderPath, { recursive: true, force: true });
    } catch (error) {
      console.error("Failed to delete backup:", error);
      throw error;
    }
  }
}
