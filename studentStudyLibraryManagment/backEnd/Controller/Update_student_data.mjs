import AddData from "../Models/Add_Student_Data.mjs"; // Adjust the path as necessary

export const updateStudentData = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the student by ID and update it
    const updatedStudent = await AddData.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate the data against the model
    });

    if (!updatedStudent) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.status(200).send(updatedStudent); // Send the updated student back
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
