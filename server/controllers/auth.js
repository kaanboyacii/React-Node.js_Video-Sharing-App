import mongoose from "mongoose";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import { createError } from "../error.js";

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        // Store hash in your password DB.
        const newUser = new User({...req.body, password: hash });
        await newUser.save();
        res.status(200).send("User has been created !");
    } catch (err) {
        next(err)
        //createError(404,"Something went wrong !")
    }
}

export const signin = async (req, res, next) => {
    try {
       const user = await User.findOne({name:req.body.name});
       if(!user) return next(createError(404,"User not found !"));

       const isCorrect = await bcrypt.compare(req.body.password, user.password);
       if(!isCorrect) return next(createError(400,"Wrong credentials !"))
    } catch (err) {
        next(err)
        //createError(404,"Something went wrong !")
    }
}