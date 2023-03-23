import { createError } from "../error.js";
import User from "../models/User.js"
import Video from "../models/Video.js"
import Report from "../models/Report.js";

export const addReport = async (req, res) => {
  try {
    const { videoId, userId, message } = req.body;
    const report = new Report({
      videoId,
      userId,
      message
    });
    const savedReport = await report.save();
    res.status(200).send(savedReport);
  } catch (err) {
    next(err);
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({});
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};
