import express from "express";
import { signup } from "../controllers/auth.js";

const router = express.Router();

//Sign up
router.post("/signup",signup)

//Sign in
router.post("/signin",)

//Google auth
router.post("/google",)

export default router;