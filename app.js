const express = require("express");
const connectDB = require("./DB/connection");
const { userRouter } = require("./modules/index.router");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());
require("dotenv").config();
app.use(userRouter);
connectDB();
app.listen(process.env.PORT || 5000, () => {
  console.log("running......");
});
