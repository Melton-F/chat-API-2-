import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    sender : {
        type:String
    },
    receiver : {
        type:String
    },
    message : {
        type:String
    },
    message_status : {
        type: String,
        enum: ["read", "send", "delivered"]
    }
})

const chat = mongoose.model("Chat", chatSchema)
module.exports = chat