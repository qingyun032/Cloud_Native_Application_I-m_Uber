import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { userSignIn } from "../../apis/sign.api";
import Button from '@mui/material/Button';

type SignInProps = {
    setIsSignIn: (status: boolean) => void;
}

export const SignIn = (props: SignInProps) => {
    const { setIsSignIn } = props;
    const navigate = useNavigate()
    const logIn = () => {
        try {
            // let response = await userSignIn("test");
            navigate('/home', { state: { isDriver: false, name: 'Joey' }})
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            Sign In Component
            <Button variant="contained" onClick={logIn}>Login</Button>
            <Button variant="contained" onClick={()=>setIsSignIn(false)}>Go to Register</Button>
        </div>
    );
}