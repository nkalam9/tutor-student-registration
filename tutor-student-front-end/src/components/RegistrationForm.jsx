import {
  Input,
  InputGroup,
  Stack,
  Text,
  Select,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

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
        setCities(selectedState.cities);
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
    <form>
      <FormControl>
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

      <h2>Personal Details</h2>
      <Stack spacing={3}>
        <InputGroup>
          <Text mb="8px">Name:</Text>
          <Input
            width="auto"
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </InputGroup>

        <InputGroup>
          <Text mb="8px">Date of Birth:</Text>
          <Input
            width="auto"
            type="date"
            id="dob"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
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
          <Text mb="8px">User ID:</Text>
          <Input
            width="auto"
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
            <Text mb="8px">Tutor Photo:</Text>
            <Input
              width="auto"
              type="file"
              id="tutorPhoto"
              onChange={(e) =>
                setFormData({ ...formData, tutorPhoto: e.target.files[0] })
              }
            />
          </InputGroup>
        )}

        <InputGroup>
          <Text mb="8px">Password:</Text>
          <Input
            width="auto"
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

      <h2>Location Details</h2>
      <FormControl>
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

      <FormControl>
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

      <FormControl>
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

      <h2>Address Details</h2>
      <Stack spacing={3}>
        <InputGroup>
          <Text mb="8px">House/Building No:</Text>
          <Input
            width="auto"
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
          <Text mb="8px">Floor:</Text>
          <Input
            width="auto"
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
          <Text mb="8px">Street No:</Text>
          <Input
            width="auto"
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
          <Text mb="8px">Area:</Text>
          <Input
            width="auto"
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
          <Text mb="8px">Landmark:</Text>
          <Input
            width="auto"
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
          <Text mb="8px">Pin Code:</Text>
          <Input
            width="auto"
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

      <h2>Contact Details</h2>
      <Stack spacing={3}>
        <InputGroup>
          <Text mb="8px">Email Id:</Text>
          <Input
            width="auto"
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
          <Text mb="8px">Phone No:</Text>
          <Input
            width="auto"
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
          <h2>Teaching Subjects</h2>
          <CheckboxGroup>
            <Stack spacing={3}>
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
  );
};

export default RegistrationForm;