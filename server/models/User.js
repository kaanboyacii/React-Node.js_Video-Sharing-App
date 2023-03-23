import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String
    },
    img: {
        type: String,
        default:'https://media.istockphoto.com/id/1130884625/tr/vekt%C3%B6r/kullan%C4%B1c%C4%B1-%C3%BCyesi-vekt%C3%B6r-simgesi-ui-kullan%C4%B1c%C4%B1-arabirimi-veya-profil-face-avatar-uygulamas%C4%B1.jpg?s=612x612&w=0&k=20&c=jAf5nq1ebnZo8TJbjaB9dMHMvgff7uOk67NkF5CpgB0='
    },
    subscribers: {
        type: Number,
        default: 0
    },
    subscribedUsers: {
        type: [String],
    },
    library: {
        type: [String],
        default: [],
        unique: true
    },
    fromGoogle: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true });

export default mongoose.model("User", UserSchema);