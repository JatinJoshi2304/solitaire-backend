import express from "express";
import {
  createRoom,
  getRooms,
  getRoomWithPlayers,
  joinRoom,
} from "../controllers/roomController.js";
const router = express.Router();

router.post("/", createRoom);
router.get("/", getRooms);
router.post("/:roomId/join", joinRoom);
router.get("/:roomId", getRoomWithPlayers);

export default router;
