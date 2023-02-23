import express from "express";
import { signin, signup } from "../controllers/auth.js";

const router = express.Router();

//Sign up
router.post("/signup",signup)

//Sign in
router.post("/signin",signin)

//Google auth
router.post("/google",)

export default router;