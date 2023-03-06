import express from "express";
import { googleAuth, logout, signin, signup } from "../controllers/auth.js";

const router = express.Router();

//Sign up
router.post("/signup",signup)

//Sign in
router.post("/signin",signin)

//Sign in
router.post("/logout",logout)

//Google auth
router.post("/google", googleAuth)

export default router;