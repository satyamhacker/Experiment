import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import axios from "axios";

const ShowVacantSeats = () => {
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [students, setStudents] = useState([]); // To hold all students data
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch occupied seat data from backend
  useEffect(() => {
    fetchOccupiedSeats();
  }, []);

  const fetchOccupiedSeats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getStudents"); // Adjust the route accordingly
      setStudents(response.data); // Store all student data
      console.log(response.data);

      // Ensure that SeatNumber is treated as a string
      const seatNumbers = response.data
        .map((student) => student.SeatNumber)
        .filter((seat) => seat !== null && seat !== undefined) // Filter out null or undefined SeatNumbers
        .map((seat) => seat.toString());

      setOccupiedSeats(seatNumbers);
      console.log("Occupied seats from server:", seatNumbers); // Log the occupied seats
    } catch (error) {
      console.error("Error fetching occupied seats:", error);
    }
  };

  // Create an array of seat numbers from 1 to 82
  const totalSeats = 82;
  const seats = Array.from({ length: totalSeats }, (_, index) => index + 1);

  // Handle seat click to show alert and modal
  // Handle seat click to show alert and modal
  const handleSeatClick = (seatNumber) => {
    // Ensure seatNumber is treated as a string or as a number based on your data structure
    const student = students.find(
      (s) => s.SeatNumber === seatNumber // Directly compare without toString
    );

    if (student) {
      //   alert(`Seat Number ${seatNumber} is occupied by ${student.StudentName}.`); // Alert with student's name
      setSelectedStudent(student);
      setShowModal(true);
    } else {
      console.log(`No student found for seat number: ${seatNumber}`);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <Container>
      <h2 className="bg-yellow-300 my-4">Seat Allocation List</h2>
      <Row>
        {seats.map((seatNumber) => (
          <Col
            key={seatNumber}
            xs={3} // Change this value based on how many boxes you want per row
            className="d-flex justify-content-center align-items-center"
          >
            <div
              onClick={() => {
                if (occupiedSeats.includes(seatNumber.toString())) {
                  handleSeatClick(seatNumber);
                }
              }}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: occupiedSeats.includes(seatNumber.toString())
                  ? "green" // Color for occupied seats
                  : "white", // Color for vacant seats
                border: "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                margin: "5px",
                cursor: occupiedSeats.includes(seatNumber.toString())
                  ? "pointer"
                  : "default", // Change cursor based on seat status
                transition: "background-color 0.3s", // Smooth transition effect
              }}
            >
              {seatNumber}
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
                <strong>Admission Number:</strong>{" "}
                {selectedStudent.AdmissionNumber}
              </p>
              <p>
                <strong>Date Of Admission:</strong>{" "}
                {new Date(selectedStudent.AdmissionDate).toLocaleDateString(
                  "en-US"
                )}{" "}
                {/* Format the date */}
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
                <strong>Seat Number:</strong> {selectedStudent.SeatNumber}
              </p>
              <p>
                <strong>Amount Paid:</strong> ₹{selectedStudent.AmountPaid}
              </p>
              <p>
                <strong>Amount Due:</strong> ₹{selectedStudent.AmountDue}
              </p>
              <p>
                <strong>Locker Number:</strong> {selectedStudent.LockerNumber}
              </p>
              <p>
                <strong>Fees Paid Till Date:</strong>{" "}
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

export default ShowVacantSeats;
