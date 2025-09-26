import express from "express";
import { checkAuth, login, logout, signup, UpdateProfile, uploadAvatar } from "../controllers/auth.controller.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";

const router=express.Router();
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post(
  "/updateProfile",
  ProtectRoute,
  uploadAvatar.single("avatar"), // handle file upload
  UpdateProfile
);
router.get("/check",ProtectRoute,checkAuth);
 export default router;