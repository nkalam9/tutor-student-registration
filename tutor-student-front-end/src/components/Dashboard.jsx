import React, { useEffect, useState } from 'react';
import {
  Input,
  Stack,
  Select,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Link, useNavigate} from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate() 
  useEffect(()=>{
    if(!localStorage.getItem('jwtToken')){
      navigate("/login")
    }
  },[])
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;