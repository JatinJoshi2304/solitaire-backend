import { Router } from "express";
import {
  createGuestPlayer,
  getPlayerWithRoomId,
} from "../controllers/playerController.js";

const router = Router();

router.post("/", createGuestPlayer);
router.get("/:roomId", getPlayerWithRoomId);

export default router;
