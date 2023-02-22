import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/users.js"
import VideoRoutes from "./routes/videos.js"
import CommentRoutes from "./routes/comments.js"

const app = express();
dotenv.config();

const connectDB = () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("Connected to DB")
        })
        .catch((err) => {
            throw (err);
        });
}

app.use("/api/users",UserRoutes);
app.use("/api/videos",VideoRoutes);
app.use("/api/comments",CommentRoutes);

app.listen(8800, () => {
    connectDB();
    console.log("Connected to Server!")
})