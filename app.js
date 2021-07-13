const express = require("express");

const { sequelize, User } = require("./models");
const userRouter = require("./routes/user.router");

const app = express();
app.use(express.json());

// user
app.use("/user", userRouter);

app.use((req, res, next) => {
  return res.status(400).send("something went wrond");
});

// server.
app.listen(5000, async () => {
  console.log("localhost:5000");
  await sequelize.authenticate();
  console.log("Database Connected!");
});

// async function main() {
//   await sequelize.sync({ alert: true });
// }

// main();
