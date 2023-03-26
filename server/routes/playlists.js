import express from "express";
import { addPlaylist, addVideoToPlaylist, getAllPlaylists } from "../controllers/playlist.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/",verifyToken ,getAllPlaylists)
router.post("/",verifyToken ,addPlaylist)
router.post("/addVideo/:id/:videoId",verifyToken ,addVideoToPlaylist)

export default router;