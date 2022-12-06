import express from "express";
import userController from "../controller/userController";

const router = express.Router();

router.post("/create-user", userController.createUser);

router.patch("/change-profile-picture", userController.updateProfilePic)

router.get("/show-all-users", userController.showAllUsers)

module.exports = router;