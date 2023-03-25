import express from "express";
import {  } from "../controllers/playlist";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

router.post("/",verifyToken ,)

export default router;