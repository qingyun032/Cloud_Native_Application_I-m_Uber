import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { userSignIn } from "../../apis/sign.api";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

type SignInProps = {
    errorMessage: string;

    setErrorMessage: (message: string) => void;
    setIsSignIn: (status: boolean) => void;
}

export const SignIn = (props: SignInProps) => {
    const { setIsSignIn, errorMessage, setErrorMessage } = props;
    const navigate = useNavigate()
    const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });
        try {
            // TODO: Error handling
            // TODO: password hashing
            // await userSignIn(data);
            navigate('/home', { state: { isDriver: false, name: 'Joey' }})
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Typography component="h1" variant="h6" color="primary">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
                User Name
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="username"
                    sx={{ mb: 1.5, mt: 1 }}
                    autoFocus
                />
                Password
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{ mb: 1.5, mt: 1 }}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" size="small" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mb: 1, mt: 1 }}
                >
                    Login
                </Button>
                <Grid container>
                    <Grid item>
                        <p>
                            {"Don't have an account? "}
                            <b onClick={()=>setIsSignIn(false)}>Register</b>
                        </p>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Typography sx={{ marginTop: 1,marginBottom: 2, color: errorMessage === "None" ? "white" : "error.main" }} >
                        {errorMessage}                            
                    </Typography>
                </Grid>
            </Box>
        </>
    );
}