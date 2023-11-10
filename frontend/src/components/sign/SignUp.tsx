import * as React from 'react';
import { useState } from 'react';
import { userSignUp } from "../../apis/sign.api";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

interface UserData {
    username: string;
    email: string;
    phone: string;
    password: string;
    home: string;
    company: string;
    passwordConfirm: string;
    gender: string;
}

type SignUpProps = {
    errorMessage: string;

    setErrorMessage: (message: string) => void;
    setIsSignIn: (status: boolean) => void;
}

export const SignUp = (props: SignUpProps) => {
    const { setIsSignIn, errorMessage, setErrorMessage } = props;
    const [isFirstPage, setIsFirstPage] = useState<boolean>(true);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        gender: "",
        home: "",
        company: "",
        passwordConfirm: "",
    });

    const handleInputChange = (field: keyof UserData, value: string | boolean) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            [field]: value,
        }));
    };
    
    const handleRegister = async () => {
        try {
            // TODO: Error handling
            // TODO: password hashing
            console.log(userData)
            if (userData.password !== userData.passwordConfirm) {
                setErrorMessage('Password and Confirm Password do not match');
                return;
            }
            // await userSignUp(userData);
        } catch (error) {
            console.error('Registration failed', error);
            setErrorMessage('Registration failed');
        }
    };

    return (
        <>
            <Typography component="h1" variant="h6" color="primary">
                Sign Up
            </Typography>
            <Box sx={{ mt: 1 }}>
                {isFirstPage ? (
                    <>
                        User Name
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            value={userData.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                            autoFocus
                        />
                        Email
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={userData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                        />
                        Phone Number
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            autoComplete="phone"
                            value={userData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                        />
                        Gender
                        <RadioGroup
                            row
                            name="gender"
                            value={userData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                        >
                            <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                            <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                            <FormControlLabel value="other" control={<Radio size="small" />} label="Other" />
                        </RadioGroup>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mb: 1, mt: 1 }}
                            onClick={()=>setIsFirstPage(false)}
                        >
                            Continue
                        </Button>
                    </>
                ) : (
                    <>
                        Home Address
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="home"
                            label="Home Address"
                            name="home"
                            autoComplete="home"
                            value={userData.home}
                            onChange={(e) => handleInputChange('home', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                            autoFocus
                        />
                        Company Address
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="company"
                            label="Company Address"
                            name="company"
                            autoComplete="company"
                            value={userData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
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
                            value={userData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                        />
                        Confirm your Password
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="passwordConfirm"
                            label="Password"
                            type="passwordConfirm"
                            id="passwordConfirm"
                            value={userData.passwordConfirm}
                            onChange={(e) => handleInputChange('passwordConfirm', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mb: 1, mt: 1 }}
                            onClick={()=>setIsFirstPage(true)}
                        >
                            Back
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mb: 1, mt: 1 }}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </>
                )}
                <Grid container>
                    <Grid item>
                        <p>
                            {"Already have an Account? "}
                            <b onClick={()=>setIsSignIn(true)}>Login</b>
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