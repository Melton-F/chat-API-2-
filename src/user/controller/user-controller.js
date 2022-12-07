import User from "../model/user-model";

exports.createUser = async (req, res) => {
  try {
    const user = await new User({
      name: req.body.name,
    });
    const filename = req.files.profile_pic.name;
    console.log(filename);
    const file = req.files.profile_pic;
    file.mv("./upload/" + filename, (err) => {
      if (err) {
        return console.log("File not uploaded");
      }
      user.profile_picture = "./upload/" + filename;
      user.save();
      res.status(201).json({
        status: "Success",
        message: "user created",
        created_user: user,
      });
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateProfilePic = async (req, res) => {
  try {
    if (req.files) {
      const filename = req.files.profile_pic.name;
      const file = req.files.profile_pic;
      file.mv("./upload/" + filename, async (err) => {
        if (err) {
          return res.status(400).json({
            status: "Fail",
            message: "Couldn't able to update picture",
          });
        }
        const updation = await User.findByIdAndUpdate(
          req.body.id,
          { profile_picture: "./upload/" + filename },
          { new: true }
        );
        res.status(200).json({
          updated_profile: updation,
        });
      });
    }
  } catch (error) {
    res.send(error.message);
  }
};

exports.showAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users < 1) {
      return res.send("No users found");
    }
    res.status(200).json({
      user_counts: users.length,
      allUsers: users,
    });
  } catch (error) {
    res.send(error.message);
  }
};
