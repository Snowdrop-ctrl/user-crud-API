const express = require("express");

const userControllers = require("../controllers/user.controller");

const router = express.Router();

// crud routes
//create user
router.post("/", userControllers.create);

// display all user
router.get("/all", userControllers.display);

// find user
router.get("/:id", userControllers.find);

// delete user
router.delete("/:id", userControllers.delete);

// update user
router.put("/:id", userControllers.update);

module.exports = router;

git remote add origin https://github.com/nitesh-01/user-crud-API.git
git branch -M main
git push -u origin main