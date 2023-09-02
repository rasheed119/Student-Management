import mongoose from "mongoose";
import UserModel from "../Model/UserModel.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, password } = req.body;
    const findUser = await UserModel.findOne({ name });
    if (findUser) {
      return res.status(400).json({ message: "User Already Exsist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const addUser = await UserModel({ name, password: hashpassword });
    await addUser.save();
    res.status(200).json({ message: "User Added Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const findUser = await UserModel.findOne({ name });
    if (!findUser) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const verify_password = await bcrypt.compare(password,findUser.password);
    if(!verify_password){
        return res.status(400).json({ message : "Invaild Password" });
    }
    res.status(400).json({ message : "Login Successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
});

export { router as UserRouter };
