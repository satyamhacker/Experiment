import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import axios from "axios";

const ShowLockers = () => {
  const [occupiedLockers, setOccupiedLockers] = useState([]);
  const [students, setStudents] = useState([]); // To hold all students data
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch occupied locker data from backend
  useEffect(() => {
    fetchOccupiedLockers();
  }, []);

  const fetchOccupiedLockers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getStudents"); // Adjust the route accordingly
      setStudents(response.data); // Store all student data

      // Extract locker numbers from students data
      const lockerNumbers = response.data
        .map((student) => student.LockerNumber)
        .filter((locker) => locker !== null && locker !== undefined) // Filter out null or undefined LockerNumbers
        .map((locker) => locker.toString());

      setOccupiedLockers(lockerNumbers);
      console.log("Occupied lockers from server:", lockerNumbers); // Log the occupied lockers
    } catch (error) {
      console.error("Error fetching occupied lockers:", error);
    }
  };

  // Create an array of locker numbers from 1 to 30
  const totalLockers = 30;
  const lockers = Array.from({ length: totalLockers }, (_, index) => index + 1);

  // Handle locker click to show modal
  const handleLockerClick = (lockerNumber) => {
    const student = students.find((s) => s.LockerNumber === lockerNumber);
    console.log(student);
    if (student) {
      setSelectedStudent(student);
      console.log(student);
      setShowModal(true);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <Container>
      <h2 className="bg-yellow-300 my-4">Locker Allocation</h2>
      <Row>
        {lockers.map((lockerNumber) => (
          <Col
            key={lockerNumber}
            xs={3} // Change this value based on how many boxes you want per row
            className="d-flex justify-content-center align-items-center"
          >
            <div
              onClick={() =>
                occupiedLockers.includes(lockerNumber.toString()) &&
                handleLockerClick(lockerNumber)
              }
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: occupiedLockers.includes(
                  lockerNumber.toString()
                )
                  ? "green" // Color for occupied lockers
                  : "white", // Color for vacant lockers
                border: "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                margin: "5px",
                cursor: occupiedLockers.includes(lockerNumber.toString())
                  ? "pointer"
                  : "default", // Change cursor based on locker status
                transition: "background-color 0.3s", // Smooth transition effect
              }}
            >
              {lockerNumber}
            </div>
          </Col>
        ))}
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
                <strong>Name:</strong> {selectedStudent.StudentName}
              </p>
              <p>
                <strong>Date Of Admission:</strong>{" "}
                {new Date(selectedStudent.AdmissionDate).toLocaleDateString(
                  "en-US"
                )}{" "}
                {/* Format the date */}
              </p>
              <p>
                <strong>Admission Number:</strong>{" "}
                {selectedStudent.AdmissionNumber}
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
                <strong>Fees Paid Till:</strong>{" "}
                {new Date(selectedStudent.FeesPaidTillDate).toLocaleDateString(
                  "en-US"
                )}{" "}
                {/* Format the date */}
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

export default ShowLockers;
