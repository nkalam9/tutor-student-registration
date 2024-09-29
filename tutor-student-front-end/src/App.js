import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import DashBoard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Flex align="center" justify="center">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashBoard" element={<DashBoard />} />
        </Routes>
      </Flex>
    </Router>
  );
}

export default App;
