import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const UnallocatedStudentsSeat = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch student data from backend
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getStudents"); // Adjust the route
      const unallocatedStudents = response.data.filter(
        (student) => !student.SeatNumber || student.SeatNumber === ""
      );
      setStudents(unallocatedStudents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="bg-green-600">Students Without Seat Allocation</h1>
        </Col>
      </Row>

      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        alert("All students have been allocated seats")
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Admission Number</th>
              <th>Admission Date</th>
              <th>Fees Paid Till</th>
              <th>Student Name</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Time</th>
              <th>Shift</th>
              <th>Seat Number</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.AdmissionNumber}</td>
                <td>{new Date(student.AdmissionDate).toLocaleDateString()}</td>
                <td>
                  {new Date(student.FeesPaidTillDate).toLocaleDateString(
                    "en-US"
                  )}
                </td>
                <td>{student.StudentName}</td>
                <td>{student.Address}</td>
                <td>{student.ContactNumber}</td>
                <td>{student.Time}</td>
                <td>{student.Shift}</td>
                <td>{student.SeatNumber || "Not Allocated"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UnallocatedStudentsSeat;
