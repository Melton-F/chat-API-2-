import express from "express"
const router = express.Router()

import {createNewChat, showAllChats, updateChatById, userAllchats, userHomeChatPage, withoutContactFieldAPI} from "../controller/chat-controller"

router.post("/new-chat", createNewChat);

router.get("/show-all-chats", showAllChats);

router.patch("/edit-chat/:id", updateChatById);

router.post("/all-chats-of-user", userAllchats);

router.post("/chat-home-page", userHomeChatPage);

router.post("/chat-application-chats-column", withoutContactFieldAPI);

module.exports = router