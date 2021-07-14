const { sequelize, User } = require("../models");
const {
  validationErrors,
  validationErrorForSingleUser,
  idNullValidater,
} = require("../helpers/validation.error");

console.log(validationErrors, validationErrorForSingleUser);
// const { ValidationError } = require("sequelize/types");

// create user
exports.create = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({ name, email, role });
    return res.json(user);
  } catch (error) {
    return res.status(404).json({
      error: validationErrors(error),
    });
  }
};

// display user
exports.display = async (req, res, next) => {
  try {
    const user = await User.findAll();

    return res.json(user);
  } catch (error) {
    return res.status(404).json({ error: "page not found" });
  }
};

// find user
exports.find = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
    });

    //custom validation
    idNullValidater(user);

    return res.json(user);
  } catch (error) {
    return res.status(404).json({
      error: validationErrorForSingleUser(error),
    });
  }
};

// delete user
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
    });

    //custom validation
    idNullValidater(user);

    await user.destroy();
    return res.json({ message: "user deleted!" });
  } catch (error) {
    // console.log(error);
    return res.status(404).json({
      error: validationErrorForSingleUser(error),
    });
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

    //custom validation
    idNullValidater(user);

    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();
    return res.json({ message: "user updated!" });
  } catch (error) {
    return res.status(404).json(validationErrorForSingleUser(error));
  }
};
