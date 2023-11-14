import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px"
});

const Text = styled(TextField)({
  width: "275px"
})

type UserInfoProps = {
  setStatus: (status: string) => void;
  User: {
    name: string;
    email: string;
    phone: string;
    gender: string;
    home: string;
    company: string;
    wallet: string;
    start: string;
    destination: string;
    time: string;
    people: number;
  };
}

export const UserInfo = (props: UserInfoProps) => {
  const { setStatus, User } = props;
  const [ readonly, setReadonly ] = useState<boolean>(true);
  return (
    <>
      <Typography component="h1" variant="h5" color="primary">
        User Info
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: 'space-evenly',
          // border: "solid",
          // borderColor: "#e0e0e0",
          // borderRadius: "10px",
          pt: "20px",
          pb: "20px",
          minHeight: "75vh"
        }}
      >
        <Text
          id="email"
          label="Email"
          defaultValue={User.email}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <Text
          id="phone"
          label="Phone number"
          defaultValue={User.phone}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <Text
          id="gender"
          label="Gender"
          defaultValue={User.gender}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <Text
          id="home"
          label="Home address"
          defaultValue={User.home}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <Text
          id="company"
          label="Company address"
          defaultValue={User.company}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <Text
          id="wallet"
          label="Wallet"
          defaultValue={User.wallet}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <MidButton variant="contained" >Edit</MidButton>
        <MidButton variant="contained" onClick={() => setStatus("home")}>Back</MidButton>
      </Box>
    </>
  );
}