import express from "express";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUserforSider,
  sendMessage,
  upload,   // import multer upload
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/user", ProtectRoute, getUserforSider);
router.get("/:id", ProtectRoute, getMessages);

// use multer middleware on send route
router.post("/send/:id", ProtectRoute, upload.single("image"), sendMessage);

export default router;
