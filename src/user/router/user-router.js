import express from "express";
import {createUser, updateProfilePic, showAllUsers} from "../controller/user-controller";

const router = express.Router();

router.post("/create-user", createUser);

router.patch("/change-profile-picture", updateProfilePic)

router.get("/show-all-users", showAllUsers)

module.exports = router;