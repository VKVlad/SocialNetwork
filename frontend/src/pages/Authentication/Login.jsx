import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Button, TextField} from "@mui/material";
import {loginUserAction} from "../../Redux/Auth/auth.action";
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";

const initialValues = {email: "", password: ""};
const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
        ),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log("handle submit", values);
        dispatch(loginUserAction({data: values}));
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className="space-y-6">
                        <div>
                            <Field
                                as={TextField}
                                name="email"
                                label="Email address"
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
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500"/>

                        </div>
                        <div>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="primary"
                            >
                                Sign in
                            </Button>
                        </div>
                    </Form>
                </Formik>
                <div className="text-sm text-center">
                    <p className="text-gray-600">Don't have an account?</p>
                    <Button onClick={() => navigate("/register")}>Create an account</Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
