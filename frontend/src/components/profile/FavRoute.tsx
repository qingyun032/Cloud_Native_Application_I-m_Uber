import { useState, useRef, RefObject } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { NavigationBar } from '../navigation/NavigationBar';


const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px"
});

// TODO: use global define user type
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
  const [ edit, setEdit ] = useState<boolean>(false);
  const refs: { [key:string]: RefObject<HTMLDivElement> } = {
    start: useRef<HTMLDivElement>(null),
    destination: useRef<HTMLDivElement>(null),
    time: useRef<HTMLDivElement>(null),
    people: useRef<HTMLDivElement>(null),
  }

  const Text = styled(TextField)({
    width: "275px",
    label: {
      color: (edit)? "#313944" : "darkgrey",
      fontWeight: "bold",
    },
  })

  const inputProps = {
    disabled: !edit,
    style: {
      fontSize: "14px",
    },
  }

  const editClick = () => {
    if(edit){
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
    setEdit(!edit);
  }

  return (
    <>
      <NavigationBar></NavigationBar>
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
          InputProps={inputProps}
        />
        <Text
          id="destination"
          label="Destination"
          defaultValue={user.destination}
          ref={refs["destination"]}
          variant="standard"
          InputProps={inputProps}
        />
        <Text
          id="time"
          label="Time"
          type="time"
          defaultValue={user.time}
          ref={refs["time"]}
          variant="standard"
          InputProps={inputProps}
        />
        <Text
          id="people"
          label="Number of people"
          type="number"
          defaultValue={user.people}
          ref={refs["people"]}
          variant="standard"
          InputProps={inputProps}
        />
        <MidButton variant="contained" onClick={() => editClick()}>{(edit)? "Update" : "Edit"}</MidButton>
        <MidButton variant="contained" onClick={() => setStatus("home")} style={{background: "#9C694C"}}>Back</MidButton>
      </Box>
    </>
  );
}