import mongoose from "mongoose";
import User from "../models/User.js"
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        // Store hash in your password DB.
        const newUser = new User({...req.body, password: hash });
        await newUser.save();
        res.status(200).send("User has been created!");
    } catch (err) {

    }
}