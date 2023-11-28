import { useState, useRef, RefObject } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

import { user } from '../../../models/user.model';


const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px",
  background: "#9C694C",
});

type DriverRouteProps = {
  setStatus: (status: string) => void;
  user: user;
  setUser: (user: user) => void;
}

export const DriverRoute = (props: DriverRouteProps) => {
  const { setStatus, user, setUser } = props;
  const [ edit, setEdit ] = useState<boolean>(false);
  const refs: { [key:string]: RefObject<HTMLDivElement> } = {
    start: useRef<HTMLDivElement>(null),
    destination: useRef<HTMLDivElement>(null),
    time: useRef<HTMLDivElement>(null),
    people: useRef<HTMLDivElement>(null),
  }

  const stopList = ["台灣大學", "家樂福新店店", "家樂福北大店", "1", "2", "3"];

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
        favRoute:{
          driver: {
            start: refs["start"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.driver.start,
            destination: refs["destination"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.driver.destination,
            time: refs["time"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.driver.time,
            stops: user.favRoute.driver.stops,
          },
          passenger: {...user.favRoute.passenger},
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
        defaultValue={user.favRoute.driver.start}
        ref={refs["start"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="destination"
        label="Destination"
        defaultValue={user.favRoute.driver.destination}
        ref={refs["destination"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="time"
        label="Time"
        type="time"
        defaultValue={user.favRoute.driver.time}
        ref={refs["time"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Autocomplete
        multiple
        id="stops"
        options={stopList}
        defaultValue={user.favRoute.driver.stops}
        disabled={!edit}
        renderInput={(params) => (
          <Text
            {...params}
            variant="standard"
            label="Stops"
          />
        )}
      />
      <MidButton variant="contained" onClick={() => editClick()} style={editStyle}>{(edit)? "Update" : "Edit"}</MidButton>
      <MidButton variant="contained" onClick={() => setStatus("home")}>Back</MidButton>
    </>
  );
}