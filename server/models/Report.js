import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        videoId: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);