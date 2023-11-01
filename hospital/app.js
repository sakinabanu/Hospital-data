import bcrypt from "bcrypt";
import config from "config";
import CryptoJS from "crypto-js";
import express from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "./middlewares/users/authmiddleware.js";
import userModel from "./models/users/users.js";
import "./utils/dbconnect.js";

// controllers
import publicRouter from "./controllers/public/user/index.js";
import userRouter from "./controllers/users/index.js";
// import adminRouter from "./controllers/admins/index.js"

const app = express();
const PORT = config.get("PORT") || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`SERVER IS RUNNING AT ${PORT}`);
});

// modeles
app.use("/public", publicRouter);
app.use(authMiddleware);
app.use("/users", userRouter);
// app.use("/admins", adminRouter)

//Error handler
app.use((req, res) => {
  res.status(404).send("Invalid Route");
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT ${PORT}`);
});
