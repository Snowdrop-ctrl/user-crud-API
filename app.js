const express = require("express");

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
app.listen(5000, async () => {
  console.log("localhost:5000");
  await sequelize.authenticate();
  console.log("Database Connected!");
});

// async function main() {
//   await sequelize.sync({ alert: true });
// }

// main();
