import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
const app = express();


import userRouter from "./user/router/user-router"
import chatRouter from "./chat/router/chat-router"

//file upload middleware
app.use(fileUpload());

// body parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongoose connection

mongoose.connect("mongodb://localhost:27017/chat-API");
mongoose.connection
  .once("open", () => {
    console.log("DB connected");
  })
  .on("error", (error) => {
    console.log("error is:", error);
  });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});

app.use("/user", userRouter)
app.use("/chat", chatRouter)