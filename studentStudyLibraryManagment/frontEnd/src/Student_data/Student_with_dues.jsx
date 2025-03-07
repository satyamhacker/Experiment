import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const StudentWithDues = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch student data from backend
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getStudents"); // Adjust the route accordingly
      setStudents(response.data);
      console.log("response from server", response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter students with unpaid fees (including "₹0" and "₹" as unpaid)
  const studentsWithDues = students.filter((student) => student.AmountDue > 0);

  // Filter based on search term
  const filteredStudents = studentsWithDues.filter((student) =>
    Object.values(student).some(
      (value) =>
        value != null &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase()) // Check if value is not null
    )
  );

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h2 className="bg-blue-500">Unpaid Fees Students</h2>
        </Col>
        <Col md={4}>
          <Form inline="true">
            <Form.Control
              type="text"
              placeholder="Search by any field..."
              value={searchTerm}
              onChange={handleSearch}
              className="border-2 border-blue-500" // Change 'blue-500' to your desired color
            />
          </Form>
        </Col>
      </Row>

      {studentsWithDues.length === 0 ? (
        <p>No students with unpaid fees found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Admission Number</th>
              <th>Admission Date</th>
              <th>Student Name</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Time</th>
              <th>Shift</th>
              <th>Seat Number</th>
              <th>Amount Paid</th>
              <th>Amount Due</th>
              <th>Locker Number</th>
              <th>Fees Paid Till</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.AdmissionNumber}</td>
                <td>{new Date(student.AdmissionDate).toLocaleDateString()}</td>
                <td>{student.StudentName}</td>
                <td>{student.Address}</td>
                <td>{student.ContactNumber}</td>
                <td>{student.Time}</td>
                <td>{student.Shift}</td>
                <td>{student.SeatNumber}</td>
                <td>{"₹" + student.AmountPaid}</td>
                <td>{"₹" + student.AmountDue}</td>
                <td>{student.LockerNumber}</td>
                <td>
                  {new Date(student.FeesPaidTillDate).toLocaleDateString(
                    "en-US"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default StudentWithDues;
