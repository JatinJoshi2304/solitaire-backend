import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPlayer extends Document {
  name: string;
  score: number;
  roomId: Types.ObjectId;
  isReady: boolean;
}

const PlayerSchema = new Schema<IPlayer>(
  {
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    isReady: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Player = mongoose.model<IPlayer>("Player", PlayerSchema);
