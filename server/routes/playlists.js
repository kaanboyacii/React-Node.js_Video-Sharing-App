import express from "express";
import { addPlaylist, addVideoToPlaylist, getAllPlaylists, getAPlaylist } from "../controllers/playlist.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/",verifyToken ,getAllPlaylists)
router.get("/:id",verifyToken ,getAPlaylist)
router.post("/",verifyToken ,addPlaylist)
router.post("/addVideo/:id/:videoId",verifyToken ,addVideoToPlaylist)

export default router;