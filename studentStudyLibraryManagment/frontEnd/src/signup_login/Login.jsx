import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom"; // Import Link here
import Context from "../Context/Context";
import axios from "axios";

const Login = () => {
  // State to store input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const ContextData = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      ); // Make POST request to login endpoint

      // Check if the login was successful based on response structure
      if (response.status === 200 && response.data.length > 0) {
        const userData = response.data[0]; // Assuming the user data is the first element in the array
        alert("Login successful");

        // Set the user's email in the context and navigate to home
        ContextData.Mail(userData.email); // Adjust based on your data structure
        ContextData.logIn();

        // Set isLoggedIn to true in local storage
        localStorage.setItem("isLoggedIn", "true");

        navigate("/home");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  // Update state when input values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Set isLoggedIn to false when the page is closed or refreshed
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("isLoggedIn", "false");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="signup-container">
        <h2 className="bg-blue-500 text-white p-2">
          Mannat Library Login Page
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="bg-white-1000 text-black p-2 text-lg font-bold">
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="bg-white-900 text-black p-2 text-lg font-bold">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button className="bg-blue-800" type="submit">
            Login
          </Button>
        </Form>
        <div className="mt-4 active:bg-green-600 underline">
          <Link to="/" className="font-bold bg-white">
            Go to Signup page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
