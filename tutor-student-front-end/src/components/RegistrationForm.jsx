import React, { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  Stack,
  Select,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Box,
  Heading,
  Icon,
} from "@chakra-ui/react";

// Mock data from JSON files
const getLocationData = {
  location: [
    {
      _id: "66f789de2041c9e40d2c4d1a",
      countryStateCity: [
        {
          states: [
            {
              state: "Andhra Pradesh",
              cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
            },
            {
              state: "West Bengal",
              cities: ["Kolkata", "Siliguri", "Asansol"],
            },
            {
              state: "Maharashtra",
              cities: ["Mumbai", "Pune", "Nagpur"],
            },
            {
              state: "Telangana",
              cities: ["Hyderabad", "Warangal", "Nizamabad"],
            },
            {
              state: "Uttar Pradesh",
              cities: ["Lucknow", "Kanpur", "Firozabad"],
            },
            {
              state: "Kerala",
              cities: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
            },
            {
              state: "Karnataka",
              cities: ["Bengaluru", "Hubli-Dharwad", "Belagavi"],
            },
          ],
          _id: "66f8d2e77b02a7ba8fdb9e10",
          country: "India",
        },
        {
          states: [
            {
              state: "New York",
              cities: ["Buffalo", "Rochester", "Yonkers"],
            },
            {
              state: "California",
              cities: ["Los Angeles", "San Diego", "San Jose"],
            },
            {
              state: "Illinois",
              cities: ["Chicago", "Aurora", "Rockford"],
            },
            {
              state: "Texas",
              cities: ["Houston", "San Antonio", "Dallas"],
            },
          ],
          _id: "66f8d2e77b02a7ba8fdb9e11",
          country: "USA",
        },
      ],
    },
  ],
};

const RegistrationForm = () => {
  const initialFormData = {
    userType: "Student",
    name: "",
    dob: null,
    gender: "",
    userId: "",
    tutorPhoto: null,
    password: "",
    country: "India",
    state: "",
    city: "",
    addressDetails: {
      houseNo: "",
      floor: "",
      streetNo: "",
      area: "",
      landmark: "",
      pinCode: "",
    },
    contactDetails: {
      email: "",
      phone: "",
    },
    teachingSubjects: [],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const countriesData = getLocationData.location[0].countryStateCity.map(
      (country) => country.country
    );
    setCountries(countriesData);

    const selectedCountry = getLocationData.location[0].countryStateCity.find(
      (country) => country.country === formData.country
    );

    if (selectedCountry) {
      const statesData = selectedCountry.states.map((state) => state.state);
      setStates(statesData);

      const selectedState = selectedCountry.states.find(
        (state) => state.state === formData.state
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
  }, [formData.country, formData.state]);

  const handleCountryChange = (e) => {
    setFormData({ ...formData, country: e.target.value, state: "", city: "" });
  };

  const handleStateChange = (e) => {
    setFormData({ ...formData, state: e.target.value, city: "" });
  };

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    const updatedSubjects = checked
      ? [...formData.teachingSubjects, value]
      : formData.teachingSubjects.filter((subject) => subject !== value);
    setFormData({ ...formData, teachingSubjects: updatedSubjects });
  };

  return (
    <Box p="4" bg="white" boxShadow="md" borderRadius="md">
      <Box mt="6" textAlign="left" paddingBottom="2rem">
        <Icon viewBox="0 0 24 24" boxSize={6} color="blue.500">
          <path
            fill="currentColor"
            d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
          />
        </Icon>
        <button
          type="button"
          onClick={() => (window.location.href = "/login")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3182ce",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "8px",
          }}
        >
          Back to Login
        </button>
      </Box>
      <Heading as="h1" size="lg" mb="6" textAlign="center">
        Registration Form
      </Heading>
      <form>
        <FormControl mb="4">
          <FormLabel htmlFor="userType">Register as:</FormLabel>
          <Select
            id="userType"
            value={formData.userType}
            onChange={(e) =>
              setFormData({ ...formData, userType: e.target.value })
            }
          >
            <option value="Student">Student</option>
            <option value="Tutor">Tutor</option>
          </Select>
        </FormControl>

        <Heading as="h2" size="md" mb="4">
          Personal Details
        </Heading>
        <Stack spacing={4}>
          <InputGroup>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup>
            <FormLabel htmlFor="dob">Date of Birth:</FormLabel>
            <Input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
            />
          </InputGroup>

          <FormControl>
            <FormLabel htmlFor="gender">Gender:</FormLabel>
            <Select
              id="gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>

          <InputGroup>
            <FormLabel htmlFor="userId">User ID:</FormLabel>
            <Input
              type="text"
              id="userId"
              value={formData.userId}
              onChange={(e) =>
                setFormData({ ...formData, userId: e.target.value })
              }
            />
          </InputGroup>

          {formData.userType === "Tutor" && (
            <InputGroup>
              <FormLabel htmlFor="tutorPhoto">Tutor Photo:</FormLabel>
              <Input
                type="file"
                id="tutorPhoto"
                onChange={(e) =>
                  setFormData({ ...formData, tutorPhoto: e.target.files[0] })
                }
              />
            </InputGroup>
          )}

          <InputGroup>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}"
              title="Password must contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character and be between 8 and 20 characters long"
            />
          </InputGroup>
        </Stack>

        <Heading as="h2" size="md" mt="6" mb="4">
          Location Details
        </Heading>
        <FormControl mb="4">
          <FormLabel htmlFor="country">Country:</FormLabel>
          <Select
            id="country"
            value={formData.country}
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
            value={formData.state}
            onChange={handleStateChange}
            disabled={!formData.country}
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
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            disabled={!formData.state}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Select>
        </FormControl>

        <Heading as="h2" size="md" mt="6" mb="4">
          Address Details
        </Heading>
        <Stack spacing={4}>
          <InputGroup>
            <FormLabel htmlFor="houseNo">House/Building No:</FormLabel>
            <Input
              type="text"
              id="houseNo"
              value={formData.addressDetails.houseNo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  addressDetails: {
                    ...formData.addressDetails,
                    houseNo: e.target.value,
                  },
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <FormLabel htmlFor="floor">Floor:</FormLabel>
            <Input
              type="text"
              id="floor"
              value={formData.addressDetails.floor}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  addressDetails: {
                    ...formData.addressDetails,
                    floor: e.target.value,
                  },
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <FormLabel htmlFor="streetNo">Street No:</FormLabel>
            <Input
              type="text"
              id="streetNo"
              value={formData.addressDetails.streetNo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  addressDetails: {
                    ...formData.addressDetails,
                    streetNo: e.target.value,
                  },
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <FormLabel htmlFor="area">Area:</FormLabel>
            <Input
              type="text"
              id="area"
              value={formData.addressDetails.area}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  addressDetails: {
                    ...formData.addressDetails,
                    area: e.target.value,
                  },
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <FormLabel htmlFor="landmark">Landmark:</FormLabel>
            <Input
              type="text"
              id="landmark"
              value={formData.addressDetails.landmark}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  addressDetails: {
                    ...formData.addressDetails,
                    landmark: e.target.value,
                  },
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <FormLabel htmlFor="pinCode">Pin Code:</FormLabel>
            <Input
              type="text"
              id="pinCode"
              value={formData.addressDetails.pinCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  addressDetails: {
                    ...formData.addressDetails,
                    pinCode: e.target.value,
                  },
                })
              }
            />
          </InputGroup>
        </Stack>

        <Heading as="h2" size="md" mt="6" mb="4">
          Contact Details
        </Heading>
        <Stack spacing={4}>
          <InputGroup>
            <FormLabel htmlFor="email">Email Id:</FormLabel>
            <Input
              type="email"
              id="email"
              value={formData.contactDetails.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contactDetails: {
                    ...formData.contactDetails,
                    email: e.target.value,
                  },
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <FormLabel htmlFor="phone">Phone No:</FormLabel>
            <Input
              type="tel"
              id="phone"
              value={formData.contactDetails.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contactDetails: {
                    ...formData.contactDetails,
                    phone: e.target.value,
                  },
                })
              }
            />
          </InputGroup>
        </Stack>

        {formData.userType === "Tutor" && (
          <>
            <Heading as="h2" size="md" mt="6" mb="4">
              Teaching Subjects
            </Heading>
            <CheckboxGroup>
              <Stack spacing={4}>
                {subjects.map((subject) => (
                  <Checkbox
                    key={subject.id}
                    id={`subject-${subject.id}`}
                    value={subject.name}
                    isChecked={formData.teachingSubjects.includes(subject.name)}
                    onChange={handleSubjectChange}
                  >
                    {subject.name}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </>
        )}
      </form>
      
    </Box>
  );
};

export default RegistrationForm;
