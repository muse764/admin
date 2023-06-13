"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react"
import axios from 'axios';

export default function Register() {
    const [registerState, setRegisterState] = useState({
        full_name: "",
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e: any) => {
        setRegisterState({
            ...registerState,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        create();
    };

    const create = () => {
        axios.post(`${process.env.API_URL}/auth/register`, registerState).then((res) => {
            window.location.href = '/auth/login';
        }).catch((error) => {
            
        });
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
            <TextField type="text" onChange={handleChange} value={registerState.full_name} id="full_name" name="full_name" autoComplete="full_name" label="Full Name" />
            <TextField type="text" onChange={handleChange} value={registerState.username} id="username" name="username" autoComplete="username" label="Username" />
                <TextField type="email" onChange={handleChange} value={registerState.email} id="email" name="email" autoComplete="email" label="Email" />
                <TextField type="password" onChange={handleChange} value={registerState.password} id="password" name="password" autoComplete="password" label="Password" />
                <Button type="submit" onSubmit={handleSubmit}>Login</Button>
            </form>
        </div>
    )
}