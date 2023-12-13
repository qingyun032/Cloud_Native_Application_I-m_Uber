import { useState, useRef, RefObject } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
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

type DriverRouteProps = {
  setStatus: (status: string) => void;
}

export const DriverRoute = (props: DriverRouteProps) => {
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
  }

  const stopList = [{stopID: 0, Name: "台灣大學"}, {stopID: 1, Name: "家樂福新店店"}, {stopID: 2, Name: "家樂福北大店"}, {stopID: 3, Name: "1"}, {stopID: 4, Name: "2"}, {stopID: 5, Name: "3"}];

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
          favRoute:{
            driver: {
              Go: {
                address: goRefs["start"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.driver.Go.address,
                time: goRefs["time"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.driver.Go.time,
                stopIDs: user.favRoute.driver.Go.stopIDs,
                stopNames: user.favRoute.driver.Go.stopNames,
              },
              Back: {
                address: backRefs["destination"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.driver.Back.address,
                time: backRefs["time"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.driver.Back.time,
                stopIDs: user.favRoute.driver.Back.stopIDs,
                stopNames: user.favRoute.driver.Back.stopNames,
              }
            },
            passenger: {...user.favRoute.passenger},
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
        defaultValue={(user === null || user.favRoute === null)? null : user.favRoute.driver.Go.address}
        ref={goRefs["start"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="time"
        label="Time"
        type="time"
        defaultValue={(user === null || user.favRoute === null)? null : user.favRoute.driver.Go.time}
        ref={goRefs["time"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Autocomplete
        multiple
        id="stops"
        options={stopList.map<string>((item) => {return item.Name})}
        defaultValue={(user === null || user.favRoute === null)? [] : user.favRoute.driver.Go.stopNames}
        disabled={!edit}
        renderInput={(params) => (
          <Text
            {...params}
            variant="standard"
            label="Stops"
          />
        )}
      />
      <Divider color="#313944" sx={{marginBottom: "15px", marginTop: "10px", padding: "1px"}}/>
      <Text
        id="destination"
        label="Destination"
        defaultValue={(user === null || user.favRoute === null)? null : user.favRoute.driver.Back.address}
        ref={backRefs["destination"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="time"
        label="Time"
        type="time"
        defaultValue={(user === null || user.favRoute === null)? null : user.favRoute.driver.Back.time}
        ref={backRefs["time"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Autocomplete
        multiple
        id="stops"
        options={stopList.map<string>((item) => {return item.Name})}
        defaultValue={(user === null || user.favRoute === null)? [] : user.favRoute.driver.Back.stopNames}
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