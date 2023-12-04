import { useState, useRef, RefObject } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { userInfo } from '../../../models/user.model';


const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px",
  background: "#9C694C",
});

type PassengerRouteProps = {
  setStatus: (status: string) => void;
  user: userInfo;
  setUser: (user: userInfo) => void;
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
        favRoute: {
          passenger: {
            start: refs["start"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.passenger.start,
            destination: refs["destination"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.passenger.destination,
            time: refs["time"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.passenger.time,
            people: refs["people"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.passenger.people
          },
          driver: {...user.favRoute.driver}
        },
      });
    }
    setEdit(!edit);
  }

  return (
    <>
      <Text
        id="start"
        label="Start"
        defaultValue={user.favRoute.passenger.start}
        ref={refs["start"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="destination"
        label="Destination"
        defaultValue={user.favRoute.passenger.destination}
        ref={refs["destination"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="time"
        label="Time"
        type="time"
        defaultValue={user.favRoute.passenger.time}
        ref={refs["time"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="people"
        label="Number of people"
        type="number"
        defaultValue={user.favRoute.passenger.people}
        ref={refs["people"]}
        variant="standard"
        InputProps={inputProps}
      />
      <MidButton variant="contained" onClick={() => editClick()} style={editStyle}>{(edit)? "Update" : "Edit"}</MidButton>
      <MidButton variant="contained" onClick={() => setStatus("home")}>Back</MidButton>
    </>
  );
}