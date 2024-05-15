import {Card} from "@mui/material";
import { Grid } from '@mui/material'
import React from 'react'
import Register from './Register'
import { Route, Routes } from 'react-router-dom'
import Login from "./Login";


const Authentication = () => {
    return (
        <Grid container spacing={0} className="min-h-screen">
            <Grid item xs={12} sm={6}>
                <img src="https://cdn.pixabay.com/photo/2018/06/13/18/20/waves-3473335_1280.jpg" alt="Main" className="w-full h-full object-cover" />
            </Grid>
            <Grid item xs={12} sm={6} component={Card} elevation={7} square>
                <div className="flex justify-center items-center h-full bg-gray-50">
                    <div className="max-w-md w-full space-y-10">
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default Authentication;
