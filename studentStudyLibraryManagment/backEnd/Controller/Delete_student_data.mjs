import AddData from "../Models/Add_Student_Data.mjs"; // Adjust the path as necessary

export const deleteStudentData = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the student by ID and delete
    const result = await AddData.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student" });
  }
};
