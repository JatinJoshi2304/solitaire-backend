import mongoose, { Schema } from "mongoose";
const RoomSchema = new Schema({
    serverName: { type: String, required: true },
    code: { type: String },
    isPasswordProtected: { type: Boolean, default: false },
    ownerId: { type: String },
}, { timestamps: true });
export const Room = mongoose.model("Room", RoomSchema);
