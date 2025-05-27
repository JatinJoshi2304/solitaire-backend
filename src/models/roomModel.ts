import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  serverName: string;
  code?: string;
  isPasswordProtected: boolean;
  ownerId?: string;
}

const RoomSchema = new Schema<IRoom>(
  {
    serverName: { type: String, required: true },
    code: { type: String },
    isPasswordProtected: { type: Boolean, default: false },
    ownerId: { type: String },
  },
  { timestamps: true }
);

export const Room = mongoose.model<IRoom>("Room", RoomSchema);
