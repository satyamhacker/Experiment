import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./signup_login/Login";
import Signup from "./signup_login/Signup";
import AddStudent from "./Student_data/Add_student_data";
import ShowStudentData from "./Student_data/Show_student_data";
import HomePage from "./Student_data/Home_page";
import UnallocatedStudentsSeat from "./Student_data/Unallocated_students_seat";
import StudentWithDues from "./Student_data/Student_with_dues";
import StudentsWithLocker from "./Student_data/Show_students_haveLocker";
import ShowVacantSeats from "./Student_data/Show_studentsName_seatsUnallocated";
import ShowStudentsWithEndedMonth from "./Student_data/Students_subscription_ends";
import PublicRoute from "./Student_data/PublicRoute"; // Import the PublicRoute component
import PrivateRoute from "./Student_data/PrivateRoute"; // Import the PrivateRoute component

function App() {
  useEffect(() => {
    // Clear isLoggedIn from local storage on component mount
    // localStorage.removeItem("isLoggedIn");
    // alert("Session ended. You have been logged out.");

    const handleBeforeUnload = (event) => {
      const confirmationMessage =
        "Are you sure you want to leave? Your session will end.";
      event.returnValue = confirmationMessage; // This triggers the default confirmation dialog
      return confirmationMessage; // For some browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/" element={<PublicRoute element={<Signup />} />} />

        {/* Private Routes */}
        <Route
          path="/addStudent"
          element={<PrivateRoute element={<AddStudent />} />}
        />
        <Route
          path="/showStudentsData"
          element={<PrivateRoute element={<ShowStudentData />} />}
        />
        <Route
          path="/unallocatedStudentsSeats"
          element={<PrivateRoute element={<UnallocatedStudentsSeat />} />}
        />
        <Route
          path="/studentsWithDues"
          element={<PrivateRoute element={<StudentWithDues />} />}
        />
        <Route
          path="/studentsWithLocker"
          element={<PrivateRoute element={<StudentsWithLocker />} />}
        />
        <Route
          path="/StudentsWithoutAllocatedSeats"
          element={<PrivateRoute element={<ShowVacantSeats />} />}
        />
        <Route
          path="/studentsWithEndedMonth"
          element={<PrivateRoute element={<ShowStudentsWithEndedMonth />} />}
        />

        <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
