import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { register, login,getProfile, logout, verifyemail } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.get("/logout",logout)
router.post("/verifyemail",authMiddleware,verifyemail)


export default router;
