import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Home from "./components/Home/Home";
import Booking from "./components/Home/Booking";
import SignUp from "./components/User/SignUp";
import SignIn from "./components/User/Login";
import MyBooking from "./components/Home/MyBooking";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Booking />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/mybooking" element={<MyBooking />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
