import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { userSignIn } from "../../apis/sign.api";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import bcrypt from "bcryptjs";

type SignInProps = {
    errorMessage: string;

    setErrorMessage: (message: string) => void;
    setIsSignIn: (status: boolean) => void;
}

export const SignIn = (props: SignInProps) => {
    const { setIsSignIn, errorMessage, setErrorMessage } = props;
    // const [rememberMe, setRememberMe] = useState(false);
    // useEffect(() => {
    //     const storedToken = localStorage.getItem('authToken');
    //     if (storedToken) {
    //         // Navigate to the authenticated page
    //         navigate('/home', { state: { isDriver: false, name: 'Joey' } });
    //     }
    // }, []);

    const navigate = useNavigate()

    const toSignUp = () => {
        setErrorMessage("None");
        setIsSignIn(false);
    }

    const validate = (async(passwordInput: string, hashedPasswordFromBackend: string) => {
        try {
            // const passwordMatches = await bcrypt.compare(passwordInput, hashedPasswordFromBackend);
            const passwordMatches = true;
            if (passwordMatches) {
                console.log('password correct');
                return true;
            } else {
                console.log('password incorrect');
                return false;
            }
        } catch (error) {
            console.error('Error during password validation:', error);
            return false;
        }
    })

    // TODO: password hashing package can't be installed
    // TODO: Remember me function if needed
    // TODO: No need to relogin when refresh if needed
    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username') as string;
        const password = data.get('password') as string;

        if (username === "") {
            setErrorMessage("User Name field required.");
            return;
        } else if (password === "") {
            setErrorMessage("Password field required.");
            return;
        }

        try {
            const hashedPasswordFromBackend = await userSignIn(username);

            if (!hashedPasswordFromBackend) {
                setErrorMessage('User name not found.');
                return;
            }

            const passwordMatches = await validate(password, hashedPasswordFromBackend)
            if (passwordMatches) {
                setErrorMessage('None');

                // if (rememberMe) {
                //     // Store authentication state in local storage
                //     localStorage.setItem('authToken', 'yourAuthTokenHere');
                // } else {
                //     // Clear any previous authentication state
                //     localStorage.removeItem('authToken');
                // }

                navigate('/home', { state: { isDriver: false, name: 'Joey' } });
            } 
            else {
                setErrorMessage('Incorrect password.');
            }
        } 
        catch (error) {
            console.error(error);
            return;
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
                    control={
                        <Checkbox
                            value="remember"
                            color="primary"
                            size="small"
                            // checked={rememberMe}
                            // onChange={(e) => setRememberMe(e.target.checked)}
                        />
                    }
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
                            <b onClick={toSignUp}>Register</b>
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