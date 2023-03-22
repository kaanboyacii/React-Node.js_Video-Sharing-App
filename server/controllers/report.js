import { createError } from "../error.js";
import User from "../models/User.js"
import Video from "../models/Video.js"
import Report from "../models/Report.js";

export const addReport = async (req, res) => {
    try {
      const { videoId, userId, message} = req.body;

      const report = new Report({
        videoId,
        userId,
        message
      });
      
      await report.save();
      
      res.send('Rapor başarıyla eklendi.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Sunucu hatası.');
    }
  };
  