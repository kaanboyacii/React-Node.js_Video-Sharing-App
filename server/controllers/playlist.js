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

export const getAPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    res.status(200).json(playlist);
} catch (err) {
    next(err)
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

    // Check if the videoId already exists in the videos array
    if (playlist.videos.includes(videoId)) {
      return res.status(400).json({ message: "Video already added to the playlist" });
    }

    playlist.videos.push(videoId);
    await playlist.save();
    res.status(200).json({ message: "The video has been added to the playlist" });
  } catch (err) {
    next(err);
  }
};
