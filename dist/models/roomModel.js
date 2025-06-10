import mongoose, { Schema } from "mongoose";
const RoomSchema = new Schema({
    serverName: { type: String, required: true },
    code: { type: String },
    isPasswordProtected: { type: Boolean, default: false },
    players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
    isFull: { type: Boolean, default: false },
    ownerId: { type: String },
    isGameStarted: { type: Boolean, default: false },
}, { timestamps: true });
export const Room = mongoose.model("Room", RoomSchema);
