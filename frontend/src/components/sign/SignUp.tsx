import * as React from 'react';
import { useState } from 'react';
import { userSignUp } from "../../apis/sign.api";
import Button from '@mui/material/Button';

type SignUpProps = {
    setIsSignIn: (status: boolean) => void;
}

export const SignUp = (props: SignUpProps) => {
    const { setIsSignIn } = props;
    return (
        <div>
            Sign Up
            <Button variant="contained" onClick={()=>setIsSignIn(true)}>Register</Button>
        </div>
    );
}