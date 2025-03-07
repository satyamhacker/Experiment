import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { TextField, InputAdornment } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PaymentIcon from "@mui/icons-material/Payment";
import axios from "axios";

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    AdmissionNumber: "",
    AdmissionDate: "",
    StudentName: "",
    Address: "",
    ContactNumber: "",
    Time: "",
    Shift: "",
    SeatNumber: "",
    FeesPaidTillDate: "",
    AmountPaid: "",
    AmountDue: "",
    LockerNumber: "",
  });

  const [contactError, setContactError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate Contact Number to ensure it is 10 digits
    if (name === "ContactNumber") {
      const regex = /^\d{0,10}$/; // Allow only numbers and max length of 10
      if (regex.test(value) || value === "") {
        setContactError(
          value.length > 10 ? "Contact Number must be 10 digits." : ""
        );
        setStudentData({
          ...studentData,
          [name]: value,
        });
      } else {
        setContactError("Contact Number must be numeric.");
      }
    } else {
      setStudentData({
        ...studentData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation for Contact Number
    if (studentData.ContactNumber.length !== 10) {
      setContactError("Contact Number must be exactly 10 digits.");
      return;
    }

    try {
      const formattedData = {
        ...studentData,
        AmountPaid: studentData.AmountPaid.replace("₹", "").trim(),
        AmountDue: studentData.AmountDue.replace("₹", "").trim(),
      };

      const response = await axios.post(
        "http://localhost:3000/addStudent",
        formattedData
      );

      alert(response.data.message);
      console.log(response);
      setStudentData({
        AdmissionNumber: "",
        AdmissionDate: "",
        StudentName: "",
        Address: "",
        ContactNumber: "",
        Time: "",
        Shift: "",
        SeatNumber: "",
        FeesPaidTillDate: "",
        AmountPaid: "",
        AmountDue: "",
        LockerNumber: "",
      });
    } catch (error) {
      // Check if error response is available
      const errorMessage =
        error.response?.data?.error || "Error adding student data";
      console.error("Error adding student:", errorMessage);
      alert(errorMessage); // Show error message to the user
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 bg-green-500">Add Student Details</h2>
      <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Admission Number</Form.Label>
              <TextField
                variant="outlined"
                name="AdmissionNumber"
                value={studentData.AdmissionNumber}
                onChange={handleChange}
                fullWidth
                required
                placeholder="Enter Admission Number"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Admission Date</Form.Label>
              <TextField
                variant="outlined"
                type="date"
                name="AdmissionDate"
                value={studentData.AdmissionDate}
                onChange={handleChange}
                fullWidth
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <TextField
                variant="outlined"
                name="StudentName"
                value={studentData.StudentName}
                onChange={handleChange}
                fullWidth
                required
                placeholder="Enter Student Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <TextField
                variant="outlined"
                name="Address"
                value={studentData.Address}
                onChange={handleChange}
                fullWidth
                required
                placeholder="Enter Address"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <TextField
                variant="outlined"
                name="ContactNumber"
                value={studentData.ContactNumber}
                onChange={handleChange}
                fullWidth
                required
                placeholder="Enter Contact Number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhoneIcon />
                    </InputAdornment>
                  ),
                }}
                error={!!contactError} // Display error state
                helperText={contactError} // Show error message
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <TextField
                variant="outlined"
                name="Time"
                value={studentData.Time}
                onChange={handleChange}
                fullWidth
                required
                placeholder="Enter Time e.g 10 AM to 5 PM"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Shift</Form.Label>
              <TextField
                variant="outlined"
                name="Shift"
                value={studentData.Shift}
                onChange={handleChange}
                fullWidth
                required
                placeholder="Enter Shift"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Seat Number</Form.Label>
              <TextField
                variant="outlined"
                name="SeatNumber"
                value={studentData.SeatNumber}
                onChange={handleChange}
                fullWidth
                placeholder="Enter Seat Number"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Locker Number</Form.Label>
              <TextField
                variant="outlined"
                name="LockerNumber"
                value={studentData.LockerNumber}
                onChange={handleChange}
                fullWidth
                placeholder="Enter Locker Number"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Fees Paid Till Date</Form.Label>
              <TextField
                variant="outlined"
                type="date"
                name="FeesPaidTillDate"
                value={studentData.FeesPaidTillDate}
                onChange={handleChange}
                fullWidth
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Amount Paid</Form.Label>
          <TextField
            variant="outlined"
            name="AmountPaid"
            value={studentData.AmountPaid}
            onChange={handleChange}
            fullWidth
            required
            placeholder="Enter Amount Paid"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PaymentIcon />
                  <span className="mr-2">₹</span>
                </InputAdornment>
              ),
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount Due</Form.Label>
          <TextField
            variant="outlined"
            name="AmountDue"
            value={studentData.AmountDue}
            onChange={handleChange}
            fullWidth
            placeholder="Enter Amount Due"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PaymentIcon />
                  <span className="mr-2">₹</span>
                </InputAdornment>
              ),
            }}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-full bg-blue-500 text-white"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddStudent;
