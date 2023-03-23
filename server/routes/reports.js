import express from "express";
import { addReport, getReports } from "../controllers/report.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/",addReport)
router.get("/",getReports)

export default router;