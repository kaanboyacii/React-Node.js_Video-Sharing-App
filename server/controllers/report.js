import { createError } from "../error.js";
import User from "../models/User.js"
import Report from "../models/Report.js";

export const addReport = async (req, res, next) => {
    const newReport = new Report({ userId: req.user.id,videoId: req.video.id , ...req.body });
    try {
        const savedReport = await newReport.save();
        res.status(200).json(savedReport)
    } catch (err) {
        next(err)
    }
};
