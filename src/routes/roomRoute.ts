import express from "express";
import {
  createRoom,
  getRooms,
  getRoomWithPlayers,
  joinRoom,
  updateRoomByRoomId,
} from "../controllers/roomController.js";
const router = express.Router();

router.post("/", createRoom);
router.get("/", getRooms);
router.post("/:roomId/join", joinRoom);
router.get("/:roomId", getRoomWithPlayers);
router.put("/:roomId", updateRoomByRoomId);
export default router;
