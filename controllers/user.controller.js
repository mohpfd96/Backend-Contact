const User = require("../models/user.model");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: "User created successfully", data: user });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Invalid Username or Email or Password.", data: error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found", data: null });
    }
    res.send({ message: "User updated successfully", data: user });
  } catch (error) {
    res.status(400).send({ message: "User update failed", data: error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found", data: null });
    }
    res.send({ message: "User deleted successfully", data: user });
  } catch (error) {
    res.status(500).send({ message: "Error deleting user", data: error });
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
        .json({ message: "Invalid Email or Password", data: null });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", data: error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found", data: null });
    }
    res.send({ message: "User retrieved successfully", data: user });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user", data: error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving users", data: error });
  }
};
