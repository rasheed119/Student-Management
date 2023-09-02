import express from "express";
import studentModel from "../Model/StudentModel.js";

const router = express.Router();

//Get Student Data
router.get("/", async (req, res) => {
  try {
    const students = await studentModel.find({});
    res.status(200).json({ Total_Students: `${students.length}`, students });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: `${error.message}` });
  }
});

//Add Student Data
router.post("/", async (req, res) => {
  try {
    const { name, qualification, gender, batch } = req.body;
    if (!name || !qualification || !gender || !batch) {
      return res.status(400).json({ message: "Please Enter required details" });
    }
    const addstudent = await studentModel({
      name,
      qualification,
      gender,
      batch,
    });
    await addstudent.save();
    res.status(200).json({ message: "Student Added Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
});

//Update Student by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const finduser = await studentModel.findById(id);
    if (!finduser) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const { name, qualification, gender, batch } = req.body;
    if (!name || !qualification || !gender || !batch) {
      return res.status(400).json({ message: "Please Enter required details" });
    }
    await studentModel.findByIdAndUpdate(id, {
      $set: { name, batch, qualification, gender },
    });
    res.status(200).json({ message: "Student Updated Successfully" });
  } catch (error) {
    console.log("Error in Updating the Student", error.message);
    res.status(400).json({
      message: `Error in updating the student data : ${error.message}`,
    });
  }
});

//Delete Student by Id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const finduser = await studentModel.findById(id);
  if (!finduser) {
    return res.status(400).json({ message: "User Not Found" });
  }
  await studentModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Student Deleted Successfully" });
});

export { router as StudentRouter };
