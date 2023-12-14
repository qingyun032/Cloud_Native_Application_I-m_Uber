import { useState, useRef, RefObject } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { useUserContext } from '../../../contexts/UserContext'; 
import { infoBarType } from '../../../models/user.model';
import { updateDriverFav } from '../../../apis/user.api';

const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px",
  background: "#9C694C",
});

type DriverRouteProps = {
  setInfoBar: (infoBar: infoBarType) => void;
}

export const DriverRoute = (props: DriverRouteProps) => {
  const { setInfoBar } = props;
  const [ edit, setEdit ] = useState<boolean>(false);
  const [ goStopOpen, setGoStopOpen ] = useState<boolean>(false);
  const [ goCheck, setGoCheck ] = useState<number[]>([0]);
  const { user, setUser, setProfileStatus } = useUserContext();
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
  // TODO: call api
  const stopList = [{stopID: 0, Name: "台灣大學", address: "11111"}, {stopID: 1, Name: "家樂福新店店", address: "11111"}, {stopID: 2, Name: "家樂福北大店", address: "11111"}, {stopID: 3, Name: "1", address: "11111"}, {stopID: 4, Name: "2", address: "11111"}, {stopID: 5, Name: "3", address: "11111"}];

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

  const handleToggle = (value: number) => () => {
    const currentIndex = goCheck.indexOf(value);
    const newChecked = [...goCheck];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setGoCheck(newChecked);
    console.log(goCheck)
  };

  const editClick = async () => {
    if(edit){
      if(user !== null){
        const newUser = {
          ...user,
          favRoute:{
            driver: {
              GO: {
                address: goRefs["start"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.driver.GO.address,
                time: goRefs["time"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.driver.GO.time,
                stopIDs: user.favRoute.driver.GO.stopIDs,
                stopNames: user.favRoute.driver.GO.stopNames,
              },
              BACK: {
                address: backRefs["destination"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.driver.BACK.address,
                time: backRefs["time"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.driver.BACK.time,
                stopIDs: user.favRoute.driver.BACK.stopIDs,
                stopNames: user.favRoute.driver.BACK.stopNames,
              }
            },
            passenger: {...user.favRoute.passenger},
          },
        };
        try{
          const response = await updateDriverFav(newUser);
          setUser(newUser);
          setInfoBar({open: true, type: "success", message: response.message});
        }catch(error: any){
          setInfoBar({open: true, type: "error", message: error.response.data.error});
        }
      }
    }
    setEdit(!edit);
  }

  return (
    <>
      <div style={{fontWeight: "bold"}}>Go to work</div>
      <Text
        id="start"
        label="Start"
        defaultValue={(user === null)? null : user.favRoute.driver.GO.address}
        ref={goRefs["start"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="time"
        label="Time"
        type="time"
        defaultValue={(user === null)? null : user.favRoute.driver.GO.time}
        ref={goRefs["time"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Autocomplete
        multiple
        id="stops"
        options={stopList.map<string>((item) => {return item.Name})}
        defaultValue={(user === null || user.favRoute.driver.GO.stopNames === null)? [] : user.favRoute.driver.GO.stopNames}
        disabled={!edit}
        readOnly={true}
        onFocus={() => setGoStopOpen(true)}
        renderInput={(params) => (
          <Text
            {...params}
            variant="standard"
            label="Stops"
          />
        )}
      />
      <Dialog
        open={goStopOpen}
        onClose={() => setGoStopOpen(false)}
        fullWidth
        scroll="paper"
      >
        <DialogTitle>Stops</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            // ref={descriptionElementRef}
            tabIndex={-1}
          >
            <List>
              {stopList.map((stop, idx) => {
                const { stopID, Name, address } = stop;
                return (
                  <ListItem
                    key={stopID}
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(idx)} dense>
                      <ListItemIcon>
                        {stopID !== 111 ?
                          <Checkbox
                            edge="start"
                            checked={goCheck.indexOf(idx) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': `${idx}` }}
                          />:<></>
                        }
                      </ListItemIcon>
                      <ListItemText id={`label-${idx}`} primary={Name} secondary={address} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGoStopOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Divider color="#313944" sx={{marginBottom: "15px", marginTop: "10px", padding: "1px"}}/>
      <div style={{fontWeight: "bold"}}>Back to home</div>
      <Text
        id="destination"
        label="Destination"
        defaultValue={(user === null)? null : user.favRoute.driver.BACK.address}
        ref={backRefs["destination"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="time"
        label="Time"
        type="time"
        defaultValue={(user === null)? null : user.favRoute.driver.BACK.time}
        ref={backRefs["time"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Autocomplete
        multiple
        id="stops"
        options={stopList.map<string>((item) => {return item.Name})}
        defaultValue={(user === null || user.favRoute.driver.BACK.stopNames === null)? [] : user.favRoute.driver.BACK.stopNames}
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
      <MidButton variant="contained" onClick={() => setProfileStatus(["home", ""])}>Back</MidButton>
    </>
  );
}