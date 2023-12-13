import { useState, useRef, RefObject } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { useUserContext } from '../../../contexts/UserContext';

const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px",
  background: "#9C694C",
});

type PassengerRouteProps = {
  setStatus: (status: string) => void;
}

export const PassengerRoute = (props: PassengerRouteProps) => {
  const { setStatus } = props;
  const [ edit, setEdit ] = useState<boolean>(false);
  const { user, setUser } = useUserContext();
  const goRefs: { [key:string]: RefObject<HTMLDivElement> } = {
    start: useRef<HTMLDivElement>(null),
    time: useRef<HTMLDivElement>(null),
    people: useRef<HTMLDivElement>(null),
  };
  const backRefs: { [key:string]: RefObject<HTMLDivElement> } = {
    destination: useRef<HTMLDivElement>(null),
    time: useRef<HTMLDivElement>(null),
    people: useRef<HTMLDivElement>(null),
  };

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
      setUser((user === null)? null :
        {
          ...user,
          favRoute: {
            passenger: {
              Go: {
                address: goRefs["start"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.passenger.Go.address,
                time: goRefs["time"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.passenger.Go.time,
                passengerCnt: Number(goRefs["people"].current?.getElementsByTagName("input")[0].value) ?? user.favRoute.passenger.Go.passengerCnt,
              },
              Back: {
                address: backRefs["destination"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.passenger.Back.address,
                time: backRefs["time"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.passenger.Back.time,
                passengerCnt: Number(backRefs["people"].current?.getElementsByTagName("input")[0].value) ?? user.favRoute.passenger.Back.passengerCnt,
              }
            },
            driver: {...user.favRoute.driver}
          },
        }
      );
    }
    setEdit(!edit);
  }

  return (
    <>
      <Text
        id="start"
        label="Start"
        defaultValue={(user === null || user.favRoute === null)? null : user.favRoute.passenger.Go.address}
        ref={goRefs["start"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="time"
        label="Time"
        type="time"
        defaultValue={(user === null || user.favRoute === null)? null : user.favRoute.passenger.Go.time}
        ref={goRefs["time"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="people"
        label="Number of people"
        type="number"
        defaultValue={(user === null || user.favRoute === null)? null : user.favRoute.passenger.Go.passengerCnt}
        ref={goRefs["people"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Divider color="#313944" sx={{marginBottom: "15px", marginTop: "10px", padding: "1px"}}/>
      <Text
        id="destination"
        label="Destination"
        defaultValue={(user === null || user.favRoute === null)? null : user.favRoute.passenger.Back.address}
        ref={backRefs["destination"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="time"
        label="Time"
        type="time"
        defaultValue={(user === null || user.favRoute === null)? null : user.favRoute.passenger.Back.time}
        ref={backRefs["time"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="people"
        label="Number of people"
        type="number"
        defaultValue={(user === null || user.favRoute === null)? null : user.favRoute.passenger.Back.passengerCnt}
        ref={backRefs["people"]}
        variant="standard"
        InputProps={inputProps}
      />
      <MidButton variant="contained" onClick={() => editClick()} style={editStyle}>{(edit)? "Update" : "Edit"}</MidButton>
      <MidButton variant="contained" onClick={() => setStatus("home")}>Back</MidButton>
    </>
  );
}