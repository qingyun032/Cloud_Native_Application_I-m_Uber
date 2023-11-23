import { useState, useRef, RefObject } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px",
  background: "#9C694C",
});

// TODO: use global define user type
type car = {
  brand: string,
  type: string,
  seat: string,
  license: string
}

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
  driver: boolean,
  car: car
}


type PassengerRouteProps = {
  setStatus: (status: string) => void;
  user: user;
  setUser: (user: user) => void;
}

export const PassengerRoute = (props: PassengerRouteProps) => {
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
    paddingBottom: "10px",
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

  const editStyle = {
    background: "#313944",
    marginTop: "10px",
    marginBottom: "5px",
  }

  const editClick = () => {
    if(edit){
      setUser({
        ...user,
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
      <MidButton variant="contained" onClick={() => editClick()} style={editStyle}>{(edit)? "Update" : "Edit"}</MidButton>
      <MidButton variant="contained" onClick={() => setStatus("home")}>Back</MidButton>
    </>
  );
}