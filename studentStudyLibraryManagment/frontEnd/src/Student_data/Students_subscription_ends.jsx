import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import axios from "axios";

const ShowStudentsWithEndedMonth = () => {
  const [students, setStudents] = useState([]);
  const [expiredStudents, setExpiredStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Fetch student data from backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getStudents"); // Adjust the route accordingly
      const studentsData = response.data;

      // Filter students whose "month" has ended till the current date
      const currentDate = new Date();
      const filteredStudents = studentsData.filter((student) => {
        const studentDate = new Date(student.FeesPaidTillDate); // Assuming 'FeesPaidTillDate' is the reference date
        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(currentDate.getMonth() - 1); // Calculate one month ago from today

        // Check if the student's date is earlier than one month ago
        return studentDate < oneMonthAgo;
      });

      setStudents(studentsData); // Store all student data
      setExpiredStudents(filteredStudents); // Store only expired students
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Handle student click to show modal with details
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter expired students based on search term
  const filteredExpiredStudents = expiredStudents.filter((student) =>
    student.StudentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h2 className="bg-yellow-200 my-9">
        Students with Ended Month Till Current Date----:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by Student Name"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
          border: "2px solid #007bff", // Set border color
          borderRadius: "5px", // Rounded corners
          outline: "none", // Remove default outline
          boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)", // Optional shadow effect
        }}
      />

      <Row>
        {filteredExpiredStudents.length > 0 ? (
          filteredExpiredStudents.map((student, index) => (
            <Col key={index} xs={12} className="my-2">
              <div
                onClick={() => handleStudentClick(student)}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <strong>Name:</strong> {student.StudentName} <br />
                <strong>Admission Number:</strong> {student.AdmissionNumber}{" "}
                <br />
                <strong>Date of Admission:</strong>{" "}
                {new Date(student.AdmissionDate).toLocaleDateString("en-US")}
              </div>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <p>No students have ended their month yet.</p>
          </Col>
        )}
      </Row>

      {/* Modal for displaying student details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <div>
              <p>
                <strong>Admission Number:</strong>{" "}
                {selectedStudent.AdmissionNumber}
              </p>
              <p>
                <strong>Date of Admission:</strong>{" "}
                {new Date(selectedStudent.AdmissionDate).toLocaleDateString(
                  "en-US"
                )}
              </p>
              <p>
                <strong>Name:</strong> {selectedStudent.StudentName}
              </p>
              <p>
                <strong>Address:</strong> {selectedStudent.Address}
              </p>
              <p>
                <strong>Contact Number:</strong> {selectedStudent.ContactNumber}
              </p>
              <p>
                <strong>Time:</strong> {selectedStudent.Time}
              </p>
              <p>
                <strong>Shift:</strong> {selectedStudent.Shift}
              </p>
              <p>
                <strong>Locker Number:</strong> {selectedStudent.LockerNumber}
              </p>
              <p>
                <strong>Amount Paid:</strong> ₹{selectedStudent.AmountPaid}
              </p>
              <p>
                <strong>Amount Due:</strong> ₹{selectedStudent.AmountDue}
              </p>
              <p>
                <strong>Fees Paid Till Date:</strong>{" "}
                {new Date(selectedStudent.FeesPaidTillDate).toLocaleDateString(
                  "en-US"
                )}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-black" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ShowStudentsWithEndedMonth;
