'use client';

import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { Box, Button, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

export default function Login() {
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });
  const [errorState, setErrorState] = useState('');

  const handleChange = (e: any) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authenticate();
  };

  const authenticate = () => {
    axios
      .post(`${process.env.API_URL}/auth/login`, loginState)
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken, {
          expires: 60 * 60 * 24 * 30,
        });
        window.location.href = '/';
      })
      .catch((error) => {
        alert(error);
        setErrorState('error');
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          onChange={handleChange}
          value={loginState.email}
          id="email"
          name="email"
          autoComplete="email"
          label="Email"
        />
        <TextField
          type="password"
          onChange={handleChange}
          value={loginState.password}
          id="password"
          name="password"
          autoComplete="password"
          label="Password"
        />
        <Button type="submit" onSubmit={handleSubmit}>
          Login
        </Button>
      </form>
      <div>{errorState}</div>
    </div>
  );
}
