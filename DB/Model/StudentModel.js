import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const studentModel = mongoose.model("student", StudentSchema);

export default studentModel;
