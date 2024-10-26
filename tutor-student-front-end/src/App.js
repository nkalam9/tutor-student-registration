import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import DashBoard from "./components/Dashboard";
import HomeScreen from "./components/HomeScreen";
import TutionSlots from "./components/TutionSlots";
import StudentHomeScreen from "./components/StudentHomeScreen";

function App() {
  return (
    <Router>
      <Flex align="center" justify="center">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/tutionSlots" element={<TutionSlots/>}/>
          <Route path="/homeScreen" element={<HomeScreen/> }/>
          <Route path="/studenthomeScreen" element={<StudentHomeScreen/> }/>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashBoard" element={<DashBoard />} />
        </Routes>
      </Flex>
    </Router>
  );
}

export default App;
