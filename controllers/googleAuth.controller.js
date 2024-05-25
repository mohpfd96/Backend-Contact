// controllers/googleAuth.controller.js
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

handleGoogleAuth = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = jwt.decode(idToken);
    if (!decodedToken) {
      return res.status(400).json({ message: "Invalid ID Token!", data: {} });
    }

    const googleUserId = decodedToken.sub;
    const email = decodedToken.email;
    const profileImage = decodedToken.picture;
    const username = decodedToken.name || email.split("@")[0];

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username,
        email,
        password: "GoogleUser", //Can be something like token or ...
        googleUser: true,
        profileImage,
      });
      await user.save();
    }

    res
      .status(200)
      .json({ message: "User Login with Google Successfully!", data: user });
  } catch (error) {
    console.log(1);
    res
      .status(500)
      .json({ message: "Error handling Google Authentication!", data: error });
  }
};
module.exports = handleGoogleAuth;
