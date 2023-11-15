import * as React from 'react';
import { useState, useRef, RefObject } from 'react';
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

type FavRouteProps = {
  setStatus: (status: string) => void;
  user: user;
  setUser: (user: user) => void;
}

export const FavRoute = (props: FavRouteProps) => {
  const { setStatus, user, setUser } = props;
  const [ readonly, setReadonly ] = useState<boolean>(true);
  const [ buttonText, setButtonText ] = useState<string>("Edit");
  const refs: { [key:string]: RefObject<HTMLDivElement> } = {
    start: useRef<HTMLDivElement>(null),
    destination: useRef<HTMLDivElement>(null),
    time: useRef<HTMLDivElement>(null),
    people: useRef<HTMLDivElement>(null),
  }

  const buttonClick = () => {
    if(buttonText === "Edit"){
      setButtonText("Update");
      setReadonly(false);
    }else{
      setButtonText("Edit");
      setReadonly(true);
      setUser({
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        home: user.home,
        company: user.company,
        wallet: user.wallet,
        start: refs["start"].current?.getElementsByTagName("input")[0].value ?? user.start,
        destination: refs["destination"].current?.getElementsByTagName("input")[0].value ?? user.destination,
        time: refs["time"].current?.getElementsByTagName("input")[0].value ?? user.time,
        people: refs["people"].current?.getElementsByTagName("input")[0].value ?? user.people
      });
    }
  }

  return (
    <>
      <Typography component="h1" variant="h5" color="primary">
        Favorite Route
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
        <Text
          id="start"
          label="Start"
          defaultValue={user.start}
          ref={refs["start"]}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <Text
          id="destination"
          label="Destination"
          defaultValue={user.destination}
          ref={refs["destination"]}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <Text
          id="time"
          label="Time"
          type="time"
          defaultValue={user.time}
          ref={refs["time"]}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <Text
          id="people"
          label="Number of people"
          type="number"
          defaultValue={user.people}
          ref={refs["people"]}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <MidButton variant="contained" onClick={() => buttonClick()} >{buttonText}</MidButton>
        <MidButton variant="contained" onClick={() => setStatus("home")}>Back</MidButton>
      </Box>
    </>
    // <div>
    //   Favorite route
    //   <Button variant="contained">Update</Button>
    //   <Button variant="contained" onClick={()=>setStatus("home")}>Back</Button>
    // </div>
  );
}