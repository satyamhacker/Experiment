import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowStudentData = () => {
  const [students, setStudents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentToDelete, setStudentToDelete] = useState(null);
  const navigate = useNavigate();

  // Fetch student data from backend
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getStudents");
      if (response.data.length === 0) {
        alert("Please add Student data.");
        navigate("/addStudent");
      } else {
        setStudents(response.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Handle deleting a student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteStudent/${id}`);
      fetchStudentData(); // Refresh the list after deletion
      setShowDeleteModal(false); // Close the delete confirmation modal
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Handle showing the edit modal
  const showEditModalForStudent = (student) => {
    setCurrentStudent(student);
    setShowEditModal(true);
  };

  // Handle showing the delete confirmation modal
  const confirmDeleteStudent = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  // Handle updating a student
  const handleUpdateStudent = async () => {
    try {
      await axios.put(
        `http://localhost:3000/updateStudent/${currentStudent._id}`,
        currentStudent
      );
      setShowEditModal(false);
      fetchStudentData(); // Refresh the list after update
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter students based on the search term
  const filteredStudents = students.filter((student) =>
    Object.values(student).some((value) =>
      value
        ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
  );

  // Format the date for the table display (MM/DD/YYYY)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  // Format the date for the input[type="date"] (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1 className="bg-blue-700">All Students Data</h1>
        </Col>
        <Col md={4}>
          <Form inline="true">
            <Form.Control
              type="text"
              placeholder="Search by any field..."
              value={searchTerm}
              onChange={handleSearch}
              className="border-2 border-blue-500"
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Form>
        </Col>
      </Row>

      {students.length === 0 ? (
        <p>No student data available.</p>
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
              <th>Fees Paid Till Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.AdmissionNumber}</td>
                <td>{formatDate(student.AdmissionDate)}</td>
                <td>{student.StudentName}</td>
                <td>{student.Address}</td>
                <td>{student.ContactNumber}</td>
                <td>{student.Time}</td>
                <td>{student.Shift}</td>
                <td>{student.SeatNumber}</td>
                <td>{"₹" + student.AmountPaid}</td>
                <td>{"₹" + student.AmountDue}</td>
                <td>{student.LockerNumber}</td>
                <td>{formatDate(student.FeesPaidTillDate)}</td>
                <td>
                  <IconButton onClick={() => showEditModalForStudent(student)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => confirmDeleteStudent(student)}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Edit Student Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="AdmissionNumber">
              <Form.Label>Admission Number</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent?.AdmissionNumber || ""}
                onChange={(e) =>
                  setCurrentStudent((prev) => ({
                    ...prev,
                    AdmissionNumber: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="AdmissionDate">
              <Form.Label>Admission Date</Form.Label>
              <Form.Control
                type="date"
                value={
                  currentStudent?.AdmissionDate
                    ? formatDateForInput(currentStudent.AdmissionDate)
                    : ""
                }
                onChange={(e) =>
                  setCurrentStudent((prev) => ({
                    ...prev,
                    AdmissionDate: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="StudentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent?.StudentName || ""}
                onChange={(e) =>
                  setCurrentStudent((prev) => ({
                    ...prev,
                    StudentName: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="Address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent?.Address || ""}
                onChange={(e) =>
                  setCurrentStudent((prev) => ({
                    ...prev,
                    Address: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="ContactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent?.ContactNumber || ""}
                onChange={(e) =>
                  setCurrentStudent((prev) => ({
                    ...prev,
                    ContactNumber: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="Time">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent?.Time || ""}
                onChange={(e) =>
                  setCurrentStudent((prev) => ({
                    ...prev,
                    Time: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="Shift">
              <Form.Label>Shift</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent?.Shift || ""}
                onChange={(e) =>
                  setCurrentStudent((prev) => ({
                    ...prev,
                    Shift: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="SeatNumber">
              <Form.Label>Seat Number</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent?.SeatNumber || ""}
                onChange={(e) =>
                  setCurrentStudent((prev) => ({
                    ...prev,
                    SeatNumber: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="AmountPaid">
              <Form.Label>Amount Paid</Form.Label>
              <Form.Control
                type="number"
                value={currentStudent?.AmountPaid || ""}
                onChange={(e) =>
                  setCurrentStudent((prev) => ({
                    ...prev,
                    AmountPaid: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="AmountDue">
              <Form.Label>Amount Due</Form.Label>
              <Form.Control
                type="number"
                value={currentStudent?.AmountDue || ""}
                onChange={(e) =>
                  setCurrentStudent((prev) => ({
                    ...prev,
                    AmountDue: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="LockerNumber">
              <Form.Label>Locker Number</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent?.LockerNumber || ""}
                onChange={(e) =>
                  setCurrentStudent((prev) => ({
                    ...prev,
                    LockerNumber: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="FeesPaidTillDate">
              <Form.Label>Fees Paid Till Date</Form.Label>
              <Form.Control
                type="date"
                value={
                  currentStudent?.FeesPaidTillDate
                    ? formatDateForInput(currentStudent.FeesPaidTillDate)
                    : ""
                }
                onChange={(e) =>
                  setCurrentStudent((prev) => ({
                    ...prev,
                    FeesPaidTillDate: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-black" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button className="bg-blue-800" onClick={handleUpdateStudent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the student{" "}
          {studentToDelete?.StudentName}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-black"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-700"
            onClick={() => deleteStudent(studentToDelete?._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ShowStudentData;
