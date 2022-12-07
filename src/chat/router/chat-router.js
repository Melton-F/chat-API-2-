import express from "express"
const router = express.Router()

import chatController from "../controller/chat-controller"

router.post("/new-chat", chatController.createNewChat);

router.get("/show-all-chats", chatController.showAllChats);

router.patch("/edit-chat/:id", chatController.updateChatById);

// router.post("/chats-of-user", chatController.lastChats);

router.post("/chat-home-page", chatController.userHomeChatPage);

module.exports = router