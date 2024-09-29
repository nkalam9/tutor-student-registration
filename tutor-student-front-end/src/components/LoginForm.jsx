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
    userId: '',
    password: '',
    userType: 'Student',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', loginData);
  };

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
              <FormLabel htmlFor="userId">User/Email ID:</FormLabel>
              <Input
                type="text"
                id="userId"
                value={loginData.userId}
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