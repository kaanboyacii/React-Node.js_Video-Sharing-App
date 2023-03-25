import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    videos: {
        type: [String],
        default: [],
    },
},
    { timestamps: true });

export default mongoose.model("Playlist", PlaylistSchema);