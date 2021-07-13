const { sequelize, User } = require("../models");

// create user
exports.create = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({ name, email, role });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// display user
exports.display = async (req, res) => {
  try {
    const user = await User.findAll();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong." });
  }
};

// find user
exports.find = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong." });
  }
};

// delete user
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
    });
    await user.destroy();
    return res.json({ message: "user deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong." });
  }
};

// update user
exports.update = async (req, res) => {
  const id = req.params.id;
  const { name, email, role } = req.body;
  try {
    const user = await User.findOne({
      where: { id },
    });

    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();
    return res.json({ message: "user updated!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong." });
  }
};
