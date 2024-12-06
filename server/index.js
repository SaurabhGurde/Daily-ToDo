import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import dataRouter from "./routes/data.js";
import fetch from "./middleware/auth.js";
const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/user", userRouter);
app.use("/data", fetch, dataRouter);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));