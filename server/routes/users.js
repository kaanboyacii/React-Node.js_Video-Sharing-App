import express from "express";
import {
    update,
    deleteUser,
    getUser,
    subscribe,
    unsubscribe,
    like,
    dislike,
    library,
    addToLibrary,
    removeToLibrary,
    updateImg,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user's image
router.put("/updateImg/:id", verifyToken, updateImg);

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

//like a video
router.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

//add to library a video
router.put("/library/:id/:videoId", verifyToken, addToLibrary);

//remove to library a video
router.delete("/library/:id/:videoId", verifyToken, removeToLibrary);

//library videos
router.get("/library/:id", verifyToken, library);

export default router;