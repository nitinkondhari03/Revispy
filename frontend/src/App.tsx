import "./App.css";
import EmailVerification from "./Components/pages/EmailVerification";
import { Home } from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Navbar from "./Components/pages/Navbar";
import PrivateRoute from "./Components/pages/PrivateRoute";
import SignUp from "./Components/pages/SignUp";
import {Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/emailverification" element={<EmailVerification/>} />
      </Routes>
    </>
  );
}

export default App;
