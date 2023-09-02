import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { UserRouter } from "./DB/Router/UserRouter.js";
import { StudentRouter } from "./DB/Router/StudentRouter.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const mongourl = process.env.mongourl;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ Task: "Student Management" });
});

app.use("/user", UserRouter);
app.use("/student", StudentRouter);

mongoose
  .connect(mongourl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error Connecting to MongoDB", err));

app.listen(PORT, () =>
  console.log(`Server Connected Successfully at localhost:${PORT}`)
);
