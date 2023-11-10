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
// import bcrypt from "bcryptjs";

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

    const fieldLabels: { [key: string]: string } = {
        username: 'User Name',
        email: 'Email',
        phone: 'Phone Number',
        password: 'Password',
        gender: 'Gender',
        home: 'Home Address',
        company: 'Company Address',
        passwordConfirm: 'Password Confirmation',
    };

    const toSignIn = () => {
        setErrorMessage('None');
        setIsSignIn(true);
    };

    const handleInputChange = (field: keyof UserData, value: string | boolean) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            [field]: value,
        }));
    };
    
    // TODO: password hashing package can't be installed
    const handleRegister = async () => {
        const missingFields = Object.keys(userData).filter((field) => userData[field as keyof typeof userData] === '');
        if (missingFields.length > 0) {
            const missingFieldLabels = missingFields.map((field) => fieldLabels[field]).join(', ');
            setErrorMessage(`Please fill in the following required fields: ${missingFieldLabels}`);
            return;
        }
        
        if (userData.password !== userData.passwordConfirm) {
            setErrorMessage('Password and Confirm Password do not match');
            return;
        }
        // const salt = bcrypt.genSaltSync(10);
        // const passwordHashed = await create(password, salt);
        
        const passwordHashed = "123";
        const userDataWithHashedPassword = {
            ...userData,
            password: passwordHashed,
        };
        const { passwordConfirm, ...userDataForApi } = userDataWithHashedPassword;

        try {
            const signUpRes = await userSignUp(userDataForApi);
            setErrorMessage('None');
            setIsSignIn(true);
        }
        catch (error) {
            console.error(error);
            return;
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('username', e.target.value)}
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                        />
                        Gender
                        <RadioGroup
                            row
                            name="gender"
                            value={userData.gender}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('gender', e.target.value)}
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('home', e.target.value)}
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('company', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                        />
                        Password
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password Confirmation"
                            type="password"
                            id="password"
                            value={userData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                        />
                        Confirm your Password
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="passwordConfirm"
                            label="Password"
                            type="password"
                            id="passwordConfirm"
                            value={userData.passwordConfirm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('passwordConfirm', e.target.value)}
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
                            <b onClick={toSignIn}>Login</b>
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