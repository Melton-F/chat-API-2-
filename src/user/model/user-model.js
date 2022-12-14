import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type: String
    },
    contacts : [{
        type: String
    }],
    profile_picture : {
        type: String
    }
},{versionKey:false})

const user = mongoose.model("User", userSchema)
module.exports = user