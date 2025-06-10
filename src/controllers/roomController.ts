import { Request, Response } from "express";
import { Room } from "../models/roomModel.js";
import { Types } from "mongoose";
import { IPlayer, Player } from "../models/playerModel.js";

export const createRoom = async (req: Request, res: any) => {
  try {
    const { serverName, code, ownerId } = req.body;

    // Basic validation
    if (!serverName || !ownerId) {
      return res
        .status(400)
        .json({ message: "serverName and ownerId are required." });
    }

    // Validate ownerId (must exist in Player collection)
    const ownerPlayer = (await Player.findById(ownerId)) as IPlayer;
    if (!ownerPlayer) {
      return res.status(404).json({ message: "Owner player not found." });
    }

    const isPasswordProtected = !!code;

    // Create the room
    const newRoom = new Room({
      serverName,
      code,
      isPasswordProtected,
      ownerId,
      players: [ownerId],
    });

    await newRoom.save();

    ownerPlayer.roomId = newRoom._id as Types.ObjectId;

    ownerPlayer.isOwner = true;
    await ownerPlayer.save();

    return res.status(201).json({
      message: "Room created successfully.",
      room: newRoom,
    });
  } catch (error) {
    console.error("Room creation error:", error);
    return res.status(500).json({ message: "Failed to create room." });
  }
};

export const joinRoom = async (req: Request, res: any) => {
  try {
    const { roomId } = req.params;
    const { name, code } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.players.length >= 5) {
      return res.status(409).json({ message: "Players Limit reached" });
    }

    if (room.isPasswordProtected && room.code !== code) {
      return res.status(403).json({ message: "Invalid room code" });
    }

    // ✅ Check if a player with the name already joined this room
    const alreadyJoined = await Player.findOne({ name, roomId });
    if (alreadyJoined) {
      return res
        .status(409)
        .json({ message: "Player name already taken in this room" });
    }

    // ✅ Find the guest player by name (roomId is null)
    const existingPlayer = await Player.findOne({ name, roomId: null });
    const playerId = existingPlayer?._id;
    if (!existingPlayer) {
      return res
        .status(404)
        .json({ message: "Guest player not found or already joined a room" });
    }

    room.players.push(existingPlayer._id as Types.ObjectId);
    await room.save();
    // ✅ Assign roomId to player
    existingPlayer.roomId = new Types.ObjectId(roomId);
    await existingPlayer.save();

    // ✅ Add player ID to the room's players array
    // room.players.push(existingPlayer._id);
    // await room.save();

    res.status(200).json({
      message: "Joined room successfully",
      room,
      player: existingPlayer,
    });
  } catch (error) {
    console.error("Join room error:", error);
    res.status(500).json({ message: "Failed to join room" });
  }
};

export const getRooms = async (req: Request, res: any) => {
  try {
    const room = await Room.find().sort({ createdAt: -1 });

    res.json({ room });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch room" });
  }
};

export const updateRoomByRoomId = async (req: Request, res: any) => {
  try {
    const { roomId } = req.params;
    const { isGameStarted } = req.body;

    if (typeof isGameStarted !== "boolean") {
      return res.status(400).json({
        message: "Invalid value for isGameStarted. Must be a boolean.",
      });
    }

    const updatedRoom = await Room.findOneAndUpdate(
      { _id: roomId },
      { isGameStarted },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      message: "Room updated successfully",
      data: updatedRoom,
    });
  } catch (error) {
    console.error("Error updating room:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getRoomWithPlayers = async (req: Request, res: any) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const players = await Player.find({ roomId });

    res.json({ room, players });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch room" });
  }
};
