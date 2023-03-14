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
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", verifyToken, getUser);

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

//library videos
router.put("/library/:id/", verifyToken, library);

export default router;