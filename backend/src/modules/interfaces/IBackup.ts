import { Document, Schema } from "mongoose";

export interface IBackup extends Document {
  user: Schema.Types.ObjectId;
  backupId: string; // unique id for the backup
  fileId: string; // google drive file id
  folderId: string; // google drive folder id
}
