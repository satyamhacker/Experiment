import mongoose from "mongoose";

// Define the AddData schema
const AddStudentData = new mongoose.Schema({
  AdmissionNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  AdmissionDate: {
    type: Date,
    required: true,
    trim: true,
  },
  StudentName: {
    type: String,
    required: true,
    trim: true,
  },
  Address: {
    type: String,
    required: true,
    trim: true,
  },
  ContactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  Time: {
    type: String,
    required: true,
    trim: true,
  },
  Shift: {
    type: String,
    required: true,
    trim: true,
  },
  SeatNumber: {
    type: Number,
    trim: true,
  },
  AmountPaid: {
    type: String,
    trim: true,
  },
  AmountDue: {
    type: String,
    trim: true,
  },
  LockerNumber: {
    type: Number,
    trim: true,
  },
  FeesPaidTillDate: {
    type: Date, // Assuming it's a date, change the type as per your needs
    required: false,
  },
});

// Create the AddData model
const AddData = mongoose.model("AddData", AddStudentData);

export default AddData;
