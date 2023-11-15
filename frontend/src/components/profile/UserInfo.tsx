import * as React from 'react';
import { useState, useRef, RefObject } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
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

const SelectItem = styled(MenuItem)({
  fontSize: "14px"
})

type user = {
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
  people: string;
}

type UserInfoProps = {
  setStatus: (status: string) => void;
  user: user;
  setUser: (user: user) => void;
}

export const UserInfo = (props: UserInfoProps) => {
  const { setStatus, user, setUser } = props;
  const [ readonly, setReadonly ] = useState<boolean>(true);
  const [ buttonText, setButtonText ] = useState<string>("Edit");
  const refs: { [key:string]: RefObject<HTMLDivElement> } = {
    name: useRef<HTMLDivElement>(null),
    email: useRef<HTMLDivElement>(null),
    phone: useRef<HTMLDivElement>(null),
    gender: useRef<HTMLDivElement>(null),
    home: useRef<HTMLDivElement>(null),
    company: useRef<HTMLDivElement>(null),
    wallet: useRef<HTMLDivElement>(null),
  }
  const textMap = [
    {id: "name", label: "User name", user: user.name},
    {id: "email", label: "Email", user: user.email},
    {id: "phone", label: "Phone number", user: user.phone},
    {id: "gender", label: "Gender", user: user.gender},
    {id: "home", label: "Home address", user: user.home},
    {id: "company", label: "Company address", user: user.company},
    {id: "wallet", label: "Wallet", user: user.wallet}
  ]

  const inputProps = {
    readOnly: readonly,
    style: {
      fontSize: "14px"
    }
  }

  const buttonClick = () => {
    if(buttonText === "Edit"){
      setButtonText("Update");
      setReadonly(false);
    }else{
      setButtonText("Edit");
      setReadonly(true);
      setUser({
        name: refs["name"].current?.getElementsByTagName("input")[0].value ?? user.name,
        email: refs["email"].current?.getElementsByTagName("input")[0].value ?? user.email,
        phone: refs["phone"].current?.getElementsByTagName("input")[0].value ?? user.phone,
        gender: refs["gender"].current?.getElementsByTagName("input")[0].value ?? user.gender,
        home: refs["home"].current?.getElementsByTagName("input")[0].value ?? user.home,
        company: refs["company"].current?.getElementsByTagName("input")[0].value ?? user.company,
        wallet: refs["wallet"].current?.getElementsByTagName("input")[0].value ?? user.wallet,
        start: user.start,
        destination: user.destination,
        time: user.time,
        people: user.people
      })
    }
  }

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
          pt: "20px",
          pb: "20px",
          minHeight: "75vh"
        }}
      >
        {textMap.map(({ id, label, user }) => (
          (id === "gender")? 
          <Text
            select
            id={id}
            label={label}
            defaultValue={user}
            ref={refs[id]}
            variant="standard"
            InputProps={inputProps}
          >
            <SelectItem value={"Male"}>Male</SelectItem>
            <SelectItem value={"Female"}>Female</SelectItem>
            <SelectItem value={"Other"}>Other</SelectItem>
          </Text>
          :
          (id === "wallet")?
          <Text
            key={id}
            id={id}
            label={label}
            type="number"
            defaultValue={user}
            ref={refs[id]}
            variant="standard"
            InputProps={{...inputProps, startAdornment: <InputAdornment position="start">$</InputAdornment>}}
          />
          :
          <Text
            key={id}
            id={id}
            label={label}
            defaultValue={user}
            ref={refs[id]}
            variant="standard"
            InputProps={inputProps}
          />
        ))}
        <MidButton variant="contained" onClick={() => buttonClick()} >{buttonText}</MidButton>
        <MidButton variant="contained" onClick={() => setStatus("home")}>Back</MidButton>
      </Box>
    </>
  );
}