import express from "express";
import { addVideo, addView, deleteVideo, getAllVideo, getBySpecificTags, getByTags, getVideo,getVideosByUserId, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/",verifyToken,getAllVideo)
router.post("/",verifyToken,addVideo)
router.put("/:id",verifyToken,updateVideo)
router.delete("/:id",verifyToken,deleteVideo)
router.get("/find/:id",getVideo)
router.get("/findByUser/:userId",getVideosByUserId)

router.put("/view/:id",addView)
router.get("/trend",trend)
router.get("/random",random)
router.get("/sub", verifyToken,sub)
router.get("/tags",getByTags)
router.get("/specificTags",getBySpecificTags)
router.get("/search",search)

export default router;