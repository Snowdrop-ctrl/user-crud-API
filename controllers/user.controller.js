const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// const validator = require("validator");

const { sequelize, User } = require("../models");
const {
  validationErrors,
  validationErrorForSingleUser,
  idNullValidater,
} = require("../helpers/validation.error");

console.log(validationErrors, validationErrorForSingleUser);
// const { ValidationError } = require("sequelize/types");

module.exports = class user {
  // create user
  static async create(req, res) {
    const { name, email, role } = req.body;
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/i;
    let password = req.body.password;

    try {
      if (password.match(regex)) {
        password = bcrypt.hashSync(password, 10);
        console.log(password);
        const user = await User.create({ name, password, email, role });
        console.log(user);
        return res.json(user);
      }
      return res.status(400).json({
        erro: "password have one lowercase,uppercase, number, symbol.",
      });
    } catch (error) {
      return res.status(400).json({
        error: validationErrors(error),
      });
    }
  }

  // display user
  static async display(req, res) {
    try {
      const user = await User.findAll({
        where: { name: req.user.name },
      });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // find user
  static async find(req, res) {
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
  }

  // delete user
  static async delete(req, res) {
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
      return res.status(404).json({
        error: validationErrorForSingleUser(error),
      });
    }
  }

  // update user
  static async update(req, res) {
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
  }

  //login user
  static async userLogin(req, res) {
    const { name, password } = req.body;

    try {
      const user = await User.findOne({
        where: { name },
      });

      // user authentication
      if (await bcrypt.compare(password, user.password)) {
        // sending token
        const token = jwt.sign(
          { name: user.name },
          process.env.ACCESS_TOKEN_SECRET
        );

        // success response
        return res.status(200).json({
          success: "successful login.",
          accessToken: token,
        });
      }
      return res
        .status(400)
        .json({ error: "username and password not correct." });
    } catch (error) {
      return res.status(404).json({
        error: validationErrors(error),
      });
    }
  }

  // authencticate Token
  static authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token === null)
      return res.status(401).json({ error: "not find jason web token." });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err);
      if (err) return res.status(403).json({ error: "token is expire." });
      req.user = user;
      next();
    });
  }
};
