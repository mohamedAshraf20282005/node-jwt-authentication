const express = require("express");
const app = express();
const port = 3000;

const connectionDb = require("./connectionDb");

const userRouter = require("./server/router/user-router");

app.use(express.json());

app.use("/", userRouter);

const start = async () => {
  try {
    await connectionDb;
    app.listen(port, () => console.log("Server Is Working"));
  } catch (err) {
    console.log(err);
  }
};

start();
