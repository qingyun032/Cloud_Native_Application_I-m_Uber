import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { SignIn } from "../components/sign/SignIn";
import { SignUp } from "../components/sign/SignUp";
import Button from '@mui/material/Button';


export const SignInPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const navigate = useNavigate()
  const onClick = () => {
      navigate('/home', { state: { isDriver: false, name: 'Joey' }})
  }
  return (
    <>
      <div>
        <div>
          <Button variant="contained" onClick={onClick}>Home</Button>
        </div>
      </div>
      {isSignIn === true && <SignIn setIsSignIn={setIsSignIn} />}
      {isSignIn === false && <SignUp setIsSignIn={setIsSignIn} />}
    </>
  );
}