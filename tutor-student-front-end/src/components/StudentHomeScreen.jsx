import React from 'react';
import { Box, Button, Heading, Flex, Spacer } from '@chakra-ui/react';
import { useNavigate} from 'react-router-dom'
import LogoutButton from './LogoutButton';

const StudentHomeScreen = () => {
  const navigate = useNavigate()

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToTutionSlots = () => {
    navigate('/tutionSlots');
  };

  return (
    <Box>
      <Flex as="nav" p={4} bg="teal.500" color="white" width="100vw" display="flex" alignItems="center">
        <Heading as="h1" size="lg">Home Screen</Heading>
        <Spacer />
        <LogoutButton  />
        <Button colorScheme="white" onClick={goToDashboard}>Edit Details</Button>
      </Flex>
      <Flex height="80vh" alignItems="center" justifyContent="center">
        
        
        <Button colorScheme="teal" onClick={goToTutionSlots}>request tution slots</Button>
        
      </Flex>
    </Box>
  );

  
};

export default StudentHomeScreen;