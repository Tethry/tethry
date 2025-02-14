import { Schema, Document } from "mongoose";

export interface INonce extends Document {
  userId: Schema.Types.ObjectId;
  nonce: string;
  used: boolean;
}
