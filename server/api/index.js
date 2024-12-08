import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "../routes/user.js";
import dataRouter from "../routes/data.js";
import fetch from "../middleware/auth.js";
const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/user", userRouter);
app.use("/data", fetch, dataRouter);

export default app;