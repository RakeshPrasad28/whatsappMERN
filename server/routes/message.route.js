import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getMessages, sendMessages } from "../controllers/message.controller.js";
const router = express.Router();

router.post("/send/:receiverId",isAuthenticated, sendMessages);
router.get("/get-messages/:otherParticipantId",isAuthenticated, getMessages);

export default router;
