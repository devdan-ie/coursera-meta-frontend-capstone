import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    VStack,
    Select,
    Heading,

    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Stack,
} from '@chakra-ui/react'

import { useState, useEffect } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import useSubmit from './hooks/useSubmit';

// const seededRandom = function (seed) {
//     var m = 2**35 - 31;
//     var a = 185852;
//     var s = seed % m;
//     return function () {
//         return (s = s * a % m) / m;
//     };
// }

// const fetchAPI = function(date) {
//     let result = [];
//     let random = seededRandom(date.getDate());

//     for(let i = 17; i <= 23; i++) {
//         if(random() < 0.5) {
//             result.push(i + ':00');
//         }
//         if(random() < 0.5) {
//             result.push(i + ':30');
//         }
//     }
//     return result;
// };
// const submitAPI = function(formData) {
//     return true;
// };








export default function ReservationForm() {

    const { isLoading, response, submit } = useSubmit();


    const formik = useFormik({
        initialValues: {
            date: new Date(),
            time: '19:00',
            guests: 2,
            occasion: 'Regular Diner',

            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        },
        validationSchema: Yup.object({
            date: Yup.date().required('Required'),
            time: Yup.string().required('Required'),
            guests: Yup.number().required('Required'),
            occasion: Yup.string().required('Required'),

            firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            lastName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            submit('', values);
        },
    });

    useEffect(() => {
        console.log("isLoading", isLoading);
        console.log("response", response);

        if (!isLoading && response) {
            if (response.type === "success") {
                formik.resetForm();
            }
        }


    }, [isLoading, response]);

    return (
        <form onSubmit={formik.handleSubmit}>
            {
                response && response.type && response.message ? <Stack spacing={3}>
                    <Alert status={response.type}>
                        <AlertIcon />
                        {response.message}
                    </Alert>
                </Stack> : <></>
            }

            <VStack>
                <VStack>
                    <Heading>Reservation</Heading>
                    <VStack>
                        <Heading size='md'>Details</Heading>
                        <FormControl isInvalid={formik.touched.date && formik.errors.date}>
                            <FormLabel htmlFor="date">Date</FormLabel>
                            <Input
                                id="date"
                                name="date"
                                type='date'
                                {...formik.getFieldProps('date')}
                            />
                            <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.time && formik.errors.time}>
                            <FormLabel htmlFor="time">Time</FormLabel>
                            <Select
                                id="time"
                                name="time"
                                {...formik.getFieldProps('time')}
                            >
                                <option>17:00</option>
                                <option>18:00</option>
                                <option>19:00</option>
                                <option>20:00</option>
                                <option>21:00</option>
                                <option>22:00</option>
                            </Select>
                            <FormErrorMessage>{formik.errors.time}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.guests && formik.errors.guests}>
                            <FormLabel htmlFor="guests">Guests</FormLabel>
                            <Input
                                id="guests"
                                name="guests"
                                type='number'
                                min="1"
                                max="10"
                                {...formik.getFieldProps('guests')}
                            />
                            <FormErrorMessage>{formik.errors.guests}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.occasion && formik.errors.occasion}>
                            <FormLabel htmlFor="occasion">Occasion</FormLabel>
                            <Select
                                id="occasion"
                                name="occasion"
                                {...formik.getFieldProps('occasion')}
                            >
                                <option>Regular Diner</option>
                                <option>Birthday</option>
                                <option>Anniversary</option>
                            </Select>
                            <FormErrorMessage>{formik.errors.occasion}</FormErrorMessage>
                        </FormControl>
                    </VStack>
                </VStack>
                <VStack>
                    <Heading size='md'>Contact Info</Heading>
                    <VStack>
                        <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
                            <FormLabel htmlFor="firstName">First Name</FormLabel>
                            <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                {...formik.getFieldProps('firstName')}
                            />
                            <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.lastName && formik.errors.lastName}>
                            <FormLabel htmlFor="lastName">Last Name</FormLabel>
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                {...formik.getFieldProps('lastName')}
                            />
                            <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.phone && formik.errors.phone}>
                            <FormLabel htmlFor="phone">Phone number</FormLabel>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                {...formik.getFieldProps('phone')}
                            />
                            <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                            <FormLabel htmlFor="email">Email address</FormLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                {...formik.getFieldProps('email')}
                            />
                            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                        </FormControl>
                    </VStack>
                </VStack>
                <Button type="submit" isLoading={isLoading}
                    color='black' backgroundColor='#F4CE14' >Make Your reservation</Button>
            </VStack>
        </form>
    )
}