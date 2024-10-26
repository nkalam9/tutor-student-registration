import React from 'react';
import { Button } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {

  const handleLogout = () => {
    // Clear session values
    sessionStorage.clear();
    // Redirect to login page
    window.location.href = "/login"
  };

  return (
    <Button onClick={handleLogout} >
      Logout
    </Button>
  );
};

export default LogoutButton;