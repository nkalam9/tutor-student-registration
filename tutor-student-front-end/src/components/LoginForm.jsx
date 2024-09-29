import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    userType: 'Student',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:4000/${loginData.userType.toLocaleLowerCase()}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })

      if(!response.ok) {
        throw new Error("error logging in")
      }
      const result = await response.json()
      localStorage.setItem("jwtToken", result.token)
      alert(`${loginData.userType.toLocaleLowerCase()} logged in Successfully`)
      window.location.href = "/login"
    }
    catch(er) {
      console.error('Error:', er)
    }
  }

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      width={["100%", "50%"]}
      bg="gray.50"
    >
      <Box width="100%" maxWidth="400px" p="4" bg="white" boxShadow="md" borderRadius="md">
        <Flex justify="center" gap="4" mb="4">
          <Link to="/login">
            <Button colorScheme="blue">Login</Button>
          </Link>
          <Link to="/register">
            <Button colorScheme="green">Register</Button>
          </Link>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <h2>Login</h2>

            <FormControl>
              <FormLabel htmlFor="email">User/Email ID:</FormLabel>
              <Input
                type="text"
                id="email"
                value={loginData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password:</FormLabel>
              <Input
                type="password"
                id="password"
                value={loginData.password}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="userType">Login as:</FormLabel>
              <Select
                id="userType"
                value={loginData.userType}
                onChange={handleChange}
              >
                <option value="Student">Student</option>
                <option value="Tutor">Tutor</option>
              </Select>
            </FormControl>

            <Button type="submit" colorScheme="blue">Login</Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginForm;