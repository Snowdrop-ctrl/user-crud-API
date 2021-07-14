const express = require("express");
require("dotenv").config();
const { sequelize, User } = require("./models");
const userRouter = require("./routes/user.router");

const app = express();
app.use(express.json());

// user
app.use("/user", userRouter);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

// server.
app.listen(process.env.PORT, async () => {
  console.log(`localhost:${process.env.PORT}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});

// async function main() {
//   await sequelize.sync({ alert: true });
// }

// main();
