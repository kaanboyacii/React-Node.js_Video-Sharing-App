import express from "express";
import { addReport } from "../controllers/report.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/",addReport)

export default router;