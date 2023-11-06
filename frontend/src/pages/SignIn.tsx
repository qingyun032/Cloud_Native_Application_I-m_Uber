import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';


export const SignIn = () => {
  const navigate = useNavigate()
  const onClick = () => {
      navigate('home')
  }
  return (
    <div>
      <h1>
        SignIn
      </h1>
      <div>
        <Button variant="contained" onClick={onClick}>Hone</Button>
      </div>
    </div>
  );
}