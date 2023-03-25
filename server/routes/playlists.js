import express from "express";
import { addPlaylist, addVideoToPlaylist } from "../controllers/playlist.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/",verifyToken ,addPlaylist)
router.post("/addVideo/:id/:videoId",verifyToken ,addVideoToPlaylist)

export default router;