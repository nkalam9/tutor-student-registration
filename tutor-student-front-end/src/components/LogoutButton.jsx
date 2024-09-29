import React from 'react';
import { Button } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Clear session values
    sessionStorage.clear();
    // Redirect to login page
    history.push('/login');
  };

  return (
    <Button onClick={handleLogout} colorScheme="red">
      Logout
    </Button>
  );
};

export default LogoutButton;