import express from "express"
const router = express.Router()

import {createNewChat, showAllChats, updateChatById, allchats, userHomeChatPage} from "../controller/chat-controller"

router.post("/new-chat", createNewChat);

router.get("/show-all-chats", showAllChats);

router.patch("/edit-chat/:id", updateChatById);

router.post("/all-chats-of-user", allchats);

router.post("/chat-home-page", userHomeChatPage);

module.exports = router