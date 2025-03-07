import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/neonButton.css"; // Assuming this path is correct

const HomePage = () => {
  const navigate = useNavigate();

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4 text-bg bg-yellow-400 ">Home Page</h1>
      <Row className="justify-content-center">
        <Col md={6} className="d-flex flex-column align-items-center">
          <Button
            className="neon-button custom-button-spacing bg-black"
            style={{
              borderColor: getRandomColor(),
              color: "#fff",
              width: "250px", // Set consistent width
            }}
            onClick={() => navigate("/addStudent")}
          >
            Add Student Details
          </Button>

          <Button
            className="neon-button custom-button-spacing bg-black"
            style={{
              borderColor: getRandomColor(),
              color: "#fff",
              width: "250px", // Set consistent width
            }}
            onClick={() => navigate("/showStudentsData")}
          >
            Show All Student Details
          </Button>

          <Button
            className="neon-button custom-button-spacing bg-black"
            style={{
              borderColor: getRandomColor(),
              color: "#fff",
              width: "250px", // Set consistent width
            }}
            onClick={() => navigate("/unallocatedStudentsSeats")}
          >
            Students with Unallocated Seats
          </Button>

          <Button
            className="neon-button custom-button-spacing bg-black"
            style={{
              borderColor: getRandomColor(),
              color: "#fff",
              width: "250px", // Set consistent width
            }}
            onClick={() => navigate("/studentsWithDues")}
          >
            Show Students with Fees Dues
          </Button>

          <Button
            className="neon-button custom-button-spacing bg-black"
            style={{
              borderColor: getRandomColor(),
              color: "#fff",
              width: "250px", // Set consistent width
            }}
            onClick={() => navigate("/StudentsWithoutAllocatedSeats")}
          >
            Show Vacant Seats
          </Button>

          <Button
            className="neon-button custom-button-spacing bg-black"
            style={{
              borderColor: getRandomColor(),
              color: "#fff",
              width: "250px", // Set consistent width
            }}
            onClick={() => navigate("/studentsWithLocker")}
          >
            Show Students with Locker
          </Button>

          <Button
            className="neon-button custom-button-spacing bg-black"
            style={{
              borderColor: getRandomColor(),
              color: "#fff",
              width: "250px", // Set consistent width
            }}
            onClick={() => navigate("/studentsWithEndedMonth")}
          >
            Show Students whose Month Ended
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
