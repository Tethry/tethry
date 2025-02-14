import { Schema, model } from "mongoose";
import { IBackup } from "../interfaces/IBackup";

const backupSchema = new Schema<IBackup>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    folderId: {
      type: String,
      required: true,
    },
    fileId: {
      type: String,
      required: true,
    },
    backupId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Backup = model<IBackup>("Backup", backupSchema);
