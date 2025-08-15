import express from "express";
import { register, login, logout, refreshToken, socialLogin } from "../Controllers/authController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.post("/social-login", socialLogin);

export default router;
