import React, { useState, useEffect, Fragment } from 'react';
import {
    Input,
    Stack,
    Select,
    Button,
    FormControl,
    FormLabel,
    Box,
} from "@chakra-ui/react";

import { useNavigate, useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LogoutButton from './LogoutButton';

const TutionSlots = () => {
    const [typeOfUser, setTypeOfUser] = useState("");
    const [user, setUserId] = useState("");
    const [userData, setUserData] = useState("");

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
        },
        teachingSubjects: []
    });

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
                })
                .catch(error => console.log(error));
        }
    }, [navigate]);
    const [slotData, setSlotData] = useState({
        subject: "",
        tuitionDate: '',
        tuitionTimeTo: '',
        tuitionTimeFrom: '',
        tuitionFee: ''
    });

    const handleSlotChange = (e) => {
        const { id, value } = e.target;
        setSlotData({ ...slotData, [id]: value });
    };

    const handleSlotSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4000/${typeOfUser}/addSlots/${user}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(slotData),
            });
            console.log(response.status)
            if (response.status===409) {
                alert('Slot already added');
            }
            else if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Success:', result);
            if(response.status===200)
            alert('Slot added successfully');
        } catch (error) {
            console.error('Error adding slot:', error);
            alert('Failed to add slot');
        }
    };



    return (
        
        
        <Fragment>
            {
                typeOfUser !== "student" &&
                
                <Box mt="8">
                    <h2>Add Tuition Slot</h2>
                    <form onSubmit={handleSlotSubmit}>
                        <Stack spacing={3}>
                            <FormControl>
                                <FormLabel htmlFor="subject">Subject:</FormLabel>
                                <Select
                                    id="subject"
                                    value={slotData.subject}
                                    onChange={handleSlotChange}
                                >
                                    {console.log(formData)}
                                    <option value="">Select Subject</option>
                                    {formData.teachingSubjects.map((subject) => (
                                        <option key={subject} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="tuitionDate">Tuition Date:</FormLabel>
                                <Input
                                    type="date"
                                    id="tuitionDate"
                                    value={slotData.tuitionDate}
                                    onChange={handleSlotChange}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="tuitionTimeFrom">Tuition Time From:</FormLabel>
                                <Input
                                    type="text"
                                    id="tuitionTimeFrom"
                                    value={slotData.tuitionTimeFrom}
                                    onChange={handleSlotChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="tuitionTimeTo">Tuition Time To:</FormLabel>
                                <Input
                                    type="text"
                                    id="tuitionTimeTo"
                                    value={slotData.tuitionTimeTo}
                                    onChange={handleSlotChange}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="tuitionFee">Tuition Fee:</FormLabel>
                                <Input
                                    type="number"
                                    id="tuitionFee"
                                    value={slotData.tuitionFee}
                                    onChange={handleSlotChange}
                                />
                            </FormControl>

                            <Button type="submit" colorScheme="blue">Add Slot</Button>
                        </Stack>
                        
                    </form>
                    
                </Box>
            }
        </Fragment>

    );
};

export default TutionSlots;