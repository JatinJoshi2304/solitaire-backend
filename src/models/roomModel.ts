import mongoose, { Document, Schema, Types } from "mongoose";

export interface IRoom extends Document {
  serverName: string;
  code?: string;
  isPasswordProtected: boolean;
  players: Types.ObjectId[];
  ownerId?: string;
}

const RoomSchema = new Schema<IRoom>(
  {
    serverName: { type: String, required: true },
    code: { type: String },
    isPasswordProtected: { type: Boolean, default: false },
    players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
    ownerId: { type: String },
  },
  { timestamps: true }
);

export const Room = mongoose.model<IRoom>("Room", RoomSchema);
