import express from "express";
import { addVideo, deleteVideo, getVideo, random, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/",verifyToken,addVideo)
router.put("/:id",verifyToken,updateVideo)
router.delete("/:id",verifyToken,deleteVideo)
router.get("/find/:id",getVideo)

router.put("/view/:id",getVideo)
router.get("/trend",trend)
router.get("/random",random)
router.get("/sub", verifyToken,sub)


export default router;