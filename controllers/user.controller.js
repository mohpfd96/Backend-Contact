const User = require("../models/user.model");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: "User Created! ", data: user });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Invalid Username / Email / Password!", data: error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({ message: "User Not Found!", data: null });
    }
    res.send({ message: "User Updated!", data: user });
  } catch (error) {
    res.status(400).send({ message: "Fail Update User!", data: error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User Not Found!", data: null });
    }
    res.send({ message: "User Deleted!", data: user });
  } catch (error) {
    res.status(500).send({ message: "Error Deleting User!", data: error });
  }
};
exports.findUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: true, data: user });
    } else {
      res
        .status(401)
        .json({ message: "Invalid Email / Password!", data: null });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!", data: error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User Not Found!", data: null });
    }
    res.send({ message: "User Found!", data: user });
  } catch (error) {
    res.status(500).send({ message: "Error Getting User!", data: error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ message: "User Found!", data: users });
  } catch (error) {
    res.status(500).send({ message: "Error Getting User!", data: error });
  }
};
