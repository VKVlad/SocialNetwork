import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { registerUserAction } from "../../Redux/Auth/auth.action";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: ""
};

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
        ),
});

const Register = () => {
    const [gender, setGender] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (values) => {
        values.gender = gender
        console.log("handle submit", values);
        dispatch(registerUserAction({ data:values }))
        navigate("/");
    };

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register an account</h2>
                </div>
                <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
                    <Form className='space-y-5'>
                        <div>
                            <Field
                                as={TextField}
                                name="firstName"
                                placeholder="First Name"
                                type="text"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage name="firstName" component="div" className="text-red-500"/>
                        </div>
                        <div>
                            <Field
                                as={TextField}
                                name="lastName"
                                placeholder="Last Name"
                                type="text"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage name="lastName" component="div" className="text-red-500"/>
                        </div>
                        <div>
                            <Field
                                as={TextField}
                                name="email"
                                placeholder="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500"/>
                        </div>
                        <div>
                            <Field
                                as={TextField}
                                name="password"
                                placeholder="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500"/>
                        </div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                name="gender"
                                value={gender}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                            </RadioGroup>
                            <ErrorMessage name="gender" component="div" className="text-red-500"/>
                        </FormControl>
                        <Button
                            sx={{padding: ".8rem 0rem"}}
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Register
                        </Button>
                    </Form>
                </Formik>
                <div className="text-sm text-center">
                    <p className="text-gray-600">Don't have an account?</p>
                    <Button onClick={() => navigate("/login")}>Login</Button>
                </div>
            </div>
        </div>
    );
};

export default Register;