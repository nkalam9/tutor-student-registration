import React, { useEffect, useState } from 'react';
import {
  Input,
  Stack,
  Select,
  Button,
  FormControl,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Dashboard = () => {
  const [user, setUserId] = useState("");
  const [typeOfUser, setTypeOfUser] = useState("");
  const [userData, setUserData] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    DOB: '',
    gender: '',
    userId: '',
    email: '',
    password: '',
    location: {
      city: '',
      state: '',
      country: ''
    },
    address: {
      buildingNo: '',
      floor: '',
      streetNo: '',
      area: '',
      landMark: '',
      pinCode: ''
    },
    contactDetails: {
      emailId: '',
      phoneNo: ''
    }
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const keys = id.split('.');
    if (keys.length > 1) {
      setFormData(prevState => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value
        }
      }));
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('jwtToken')) {
      navigate("/login");
    }
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const { userId, type } = jwtDecode(token);
      console.log(userId, type);
      setUserId(userId);
      setTypeOfUser(type);
      fetch(`http://localhost:4000/${type}/${userId}`)
        .then(response => response.json())
        .then(data => {
          setFormData(data[type]);
          setUserData(data[type]);
          // Fetch location data based on the received formData
          fetchLocationData(data[type].location.country, data[type].location.state);
        })
        .catch(error => console.log(error));
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/${typeOfUser}/${user}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      setFormData(result[typeOfUser]);
      alert('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update user data');
    }
  };

  const fetchLocationData = async (country, state) => {
    try {
      const response = await fetch('http://localhost:4000/location/location');
      const data = await response.json();
      const countriesData = data.location[0].countryStateCity.map(
        (country) => country.country
      );
      setCountries(countriesData);

      const selectedCountry = data.location[0].countryStateCity.find(
        (country) => country.country === country
      );

      if (selectedCountry) {
        const statesData = selectedCountry.states.map((state) => state.state);
        setStates(statesData);

        const selectedState = selectedCountry.states.find(
          (state) => state.state === state
        );

        if (selectedState) {
          const citiesData = selectedState.cities;
          setCities(citiesData);
        } else {
          setCities([]);
        }
      } else {
        setStates([]);
        setCities([]);
      }

      const mockSubjects = [
        { id: 1, name: "Mathematics" },
        { id: 2, name: "Physics" },
        { id: 3, name: "Chemistry" },
        { id: 4, name: "Biology" },
      ];
      setSubjects(mockSubjects);
    } catch (error) {
      console.error("error fetching");
    }
  };

  const handleCountryChange = (e) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        country: e.target.value,
        state: "",
        city: ""
      }
    });
  };

  const handleStateChange = (e) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        state: e.target.value,
        city: ""
      }
    });
  };

  const handleCityChange = (e) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        city: e.target.value
      }
    });
  };

  return (
    <Box p="4" bg="white" boxShadow="md" borderRadius="md">
      <h2>Dashboard</h2>
      {userData && (
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel htmlFor="name">Name:</FormLabel>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="DOB">Date of Birth:</FormLabel>
              <Input
                type="date"
                id="DOB"
                value={formData.DOB}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="gender">Gender:</FormLabel>
              <Input
                type="text"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="userId">User ID:</FormLabel>
              <Input
                type="text"
                id="userId"
                value={formData.userId}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel htmlFor="country">Country:</FormLabel>
              <Select
                id="country"
                value={formData.location.country}
                onChange={handleCountryChange}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb="4">
              <FormLabel htmlFor="state">State:</FormLabel>
              <Select
                id="state"
                value={formData.location.state}
                onChange={handleStateChange}
                disabled={!formData.location.country}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb="4">
              <FormLabel htmlFor="city">City:</FormLabel>
              <Select
                id="city"
                value={formData.location.city}
                onChange={handleCityChange}
                disabled={!formData.location.state}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="address.buildingNo">Building No:</FormLabel>
              <Input
                type="text"
                id="address.buildingNo"
                value={formData.address.buildingNo}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="address.floor">Floor:</FormLabel>
              <Input
                type="text"
                id="address.floor"
                value={formData.address.floor}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="address.streetNo">Street No:</FormLabel>
              <Input
                type="text"
                id="address.streetNo"
                value={formData.address.streetNo}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="address.area">Area:</FormLabel>
              <Input
                type="text"
                id="address.area"
                value={formData.address.area}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="address.landMark">Landmark:</FormLabel>
              <Input
                type="text"
                id="address.landMark"
                value={formData.address.landMark}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="address.pinCode">Pin Code:</FormLabel>
              <Input
                type="text"
                id="address.pinCode"
                value={formData.address.pinCode}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="contactDetails.emailId">Contact Email:</FormLabel>
              <Input
                type="email"
                id="contactDetails.emailId"
                value={formData.contactDetails.emailId}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="contactDetails.phoneNo">Phone No:</FormLabel>
              <Input
                type="text"
                id="contactDetails.phoneNo"
                value={formData.contactDetails.phoneNo}
                onChange={handleChange}
              />
            </FormControl>

            <Button type="submit" colorScheme="blue">Save Changes</Button>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default Dashboard;