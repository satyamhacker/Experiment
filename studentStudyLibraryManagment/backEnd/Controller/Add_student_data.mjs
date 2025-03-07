import AddData from "../Models/Add_Student_Data.mjs";

export const addStudentData = async (req, res) => {
  try {
    const {
      AdmissionNumber,
      AdmissionDate,
      StudentName,
      Address,
      ContactNumber,
      Time,
      Shift,
      SeatNumber,
      FeesPaidTillDate,
      AmountPaid,
      AmountDue,
      LockerNumber,
    } = req.body;

    // Validate the received data
    if (
      !AdmissionNumber ||
      !AdmissionDate ||
      !StudentName ||
      !Address ||
      !ContactNumber ||
      !Time ||
      !Shift ||
      !FeesPaidTillDate ||
      !AmountPaid
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if AdmissionNumber or ContactNumber already exists
    const existingStudent = await AddData.findOne({
      $or: [{ AdmissionNumber }, { ContactNumber }],
    });

    if (existingStudent) {
      // Determine which field is duplicated and return the corresponding error
      if (existingStudent.AdmissionNumber == AdmissionNumber) {
        return res.status(400).json({
          error: "This Admission Number is already in use.",
          field: "AdmissionNumber",
        });
      }

      if (existingStudent.ContactNumber === ContactNumber) {
        return res.status(400).json({
          error: "This Contact Number is already in use.",
          field: "ContactNumber",
        });
      }
    }

    // Create a new student data record in the database
    const newStudentData = await AddData.create({
      AdmissionNumber,
      AdmissionDate,
      StudentName,
      Address,
      ContactNumber,
      Time,
      Shift,
      SeatNumber,
      FeesPaidTillDate,
      AmountPaid,
      AmountDue,
      LockerNumber,
    });

    // Respond with the newly created student data
    res.status(201).json({
      message: "Student data added successfully",
      data: newStudentData,
    });
  } catch (error) {
    console.error("Error adding student data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
