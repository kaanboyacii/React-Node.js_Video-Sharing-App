import { createError } from "../error.js";
import User from "../models/User.js"
import Video from "../models/Video.js"
import Playlist from "../models/Playlist.js"

export const getAllPlaylists = async (req, res, next) => {
  try {
    const reports = await Playlist.find({});
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};

export const addPlaylist = async (req, res, next) => {
    const newPlaylist = new Playlist({ ...req.body, userId: req.user.id });
    try {
        const savedPlaylist = await newPlaylist.save();
        res.status(200).send(savedPlaylist);
    } catch (err) {
        next(err);
    }
};

export const addVideoToPlaylist = async (req, res, next) => {
    const playlistId = req.params.id;
    const videoId = req.params.videoId;
    try {
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }
      playlist.videos.push(videoId);
      await playlist.save();
      res.status(200).json({ message: "The video has been added to the playlist" });
    } catch (err) {
      next(err);
    }
  };
  