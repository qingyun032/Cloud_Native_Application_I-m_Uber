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
import { Stop } from '../../../models/stop.model';
import { updateDriverFav, showStops } from '../../../apis/user.api';

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
  const { user, setUser, setProfileStatus } = useUserContext();
  const [ edit, setEdit ] = useState<boolean>(false);
  const [ goStopOpen, setGoStopOpen ] = useState<boolean>(false);
  const [ backStopOpen, setBackStopOpen ] = useState<boolean>(false);
  const [ goCheck, setGoCheck ] = useState<number[]>([]);
  const [ backCheck, setBackCheck ] = useState<number[]>([]);
  const [ goStops, setGoStops ] = useState<Array<Stop>>([]);
  const [ backStops, setBackStops ] = useState<Array<Stop>>([]);
  const [ goFav, setGoFav ] = useState<[string, string]>((user === null)? ["", ""] : [user.favRoute.driver.GO.address, user.favRoute.driver.GO.time]);
  const [ backFav, setBackFav ] = useState<[string, string]>((user === null)? ["", ""] : [user.favRoute.driver.BACK.address, user.favRoute.driver.BACK.time]);
  
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

  const openStop = async (isGo: boolean) => {
    const address = (isGo)? goFav[0] : backFav[0];
    console.log(address);
    if(isGo){
      if(address === "" || address === undefined){
        setGoStopOpen(false);
        setGoCheck([]);
        setGoStops([]);
        setInfoBar({open: true, type: "error", message: "Please fill in start address first!"});
      }else{
        try{
          const response = await showStops({isGo: true, address: address});
          setGoStops(response.Stops);
          setGoCheck([]);
          setGoStopOpen(true);
        }catch(error: any){
          setInfoBar({open: true, type: "error", message: error.response.data.error})
        }
      }
    }else{
      if(address === "" || address === undefined){
        setBackStopOpen(false);
        setBackCheck([]);
        setBackStops([]);
        setInfoBar({open: true, type: "error", message: "Please fill in start address first!"});
      }else{
        try{
          const response = await showStops({isGo: false, address: address});
          setBackStops(response.Stops);
          setBackCheck([]);
          setBackStopOpen(true);
        }catch(error: any){
          setInfoBar({open: true, type: "error", message: error.response.data.error})
        }
      }
    }
  }

  const handleToggle = (idx: number, isGo: boolean) => () => {
    const newChecked = (isGo)? [...goCheck] : [...backCheck];
    const exist = newChecked.indexOf(idx);
    if(exist !== -1)
      newChecked.splice(exist, 1);
    else{
      const newIndex = newChecked.findIndex((v) => {return v > idx});
      if(newIndex === -1)
        newChecked.push(idx);
      else
        newChecked.splice(newIndex, 0, idx);
    }
    console.log(newChecked);
    if(isGo)
      setGoCheck(newChecked);
    else
      setBackCheck(newChecked);
  };

  const editClick = async () => {
    if(edit){
      if(user !== null){
        const GOStopIDs = goCheck.map((val) => {return goStops[val].stopID});
        const GOStopNames = goCheck.map((val) => {return goStops[val].Name});
        const BACKStopIDs = backCheck.map((val) => {return backStops[val].stopID});
        const BACKStopNames = backCheck.map((val) => {return backStops[val].Name});
        const newUser = {
          ...user,
          favRoute:{
            driver: {
              GO: {
                address: (goFav[0] === null)? user.favRoute.driver.GO.address : goFav[0],
                time: (goFav[1] === null)? user.favRoute.driver.GO.time : goFav[1] + ":00",
                stopIDs: GOStopIDs,
                stopNames: GOStopNames,
              },
              BACK: {
                address: (backFav[0] === null)? user.favRoute.driver.BACK.address : backFav[0],
                time: (backFav[1] === null)? user.favRoute.driver.BACK.time : backFav[1] + ":00",
                stopIDs: BACKStopIDs,
                stopNames: BACKStopNames,
              }
            },
            passenger: {...user.favRoute.passenger},
          },
        };
        console.log(newUser);
        try{
          const response = await updateDriverFav(newUser);
          setUser(newUser);
          setInfoBar({open: true, type: "success", message: response.message});
        }catch(error: any){
          setGoFav((user === null)? ["", ""] : [user.favRoute.driver.GO.address, user.favRoute.driver.GO.time]);
          setBackFav((user === null)? ["", ""] : [user.favRoute.driver.BACK.address, user.favRoute.driver.BACK.time]);
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
        value={goFav[0]}
        onBlur={(e) => {setGoFav([e.target.value, goFav[1]])}}
        // onChange={(e) => {setGoFav([e.target.value, goFav[1]])}}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="time"
        label="Time"
        type="time"
        value={goFav[1]}
        onChange={(e) => setGoFav([goFav[0], e.target.value])}
        variant="standard"
        InputProps={inputProps}
      />
      <Autocomplete
        multiple
        id="stops"
        options={[]}
        defaultValue={(user === null || user.favRoute.driver.GO.stopNames === null)? [] : user.favRoute.driver.GO.stopNames}
        value={goCheck.map((val) => {return goStops[val].Name})}
        disabled={!edit}
        readOnly={true}
        onFocus={() => openStop(true)}
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
            tabIndex={-1}
          >
            <List>
              {goStops.map((stop, idx) => {
                // const { stopID, Name, address } = stop;
                const [ stopID, Name, address ] = Object.values(stop);
                return (
                  <ListItem
                    key={stopID}
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(idx, true)} dense>
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
                      <ListItemText id={`go-label-${idx}`} primary={Name} secondary={address} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGoStopOpen(false)}>Finish</Button>
        </DialogActions>
      </Dialog>
      <Divider color="#313944" sx={{marginBottom: "15px", marginTop: "10px", padding: "1px"}}/>
      <div style={{fontWeight: "bold"}}>Back to home</div>
      <Text
        id="destination"
        label="Destination"
        value={backFav[0]}
        onChange={(e) => setBackFav([e.target.value, backFav[1]])}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="time"
        label="Time"
        type="time"
        value={backFav[1]}
        onChange={(e) => setBackFav([backFav[0], e.target.value])}
        variant="standard"
        InputProps={inputProps}
      />
      <Autocomplete
        multiple
        id="stops"
        options={[]}
        defaultValue={(user === null || user.favRoute.driver.BACK.stopNames === null)? [] : user.favRoute.driver.BACK.stopNames}
        value={backCheck.map((val) => {return backStops[val].Name})}
        disabled={!edit}
        readOnly={true}
        onFocus={() => openStop(false)}
        renderInput={(params) => (
          <Text
            {...params}
            variant="standard"
            label="Stops"
          />
        )}
      />
      <Dialog
        open={backStopOpen}
        onClose={() => setBackStopOpen(false)}
        fullWidth
        scroll="paper"
      >
        <DialogTitle>Stops</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            tabIndex={-1}
          >
            <List>
              {backStops.map((stop, idx) => {
                const { stopID, Name, address } = stop;
                return (
                  <ListItem
                    key={stopID}
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(idx, false)} dense>
                      <ListItemIcon>
                        {stopID !== 111 ?
                          <Checkbox
                            edge="start"
                            checked={backCheck.indexOf(idx) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': `${idx}` }}
                          />:<></>
                        }
                      </ListItemIcon>
                      <ListItemText id={`back-label-${idx}`} primary={Name} secondary={address} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBackStopOpen(false)}>Finish</Button>
        </DialogActions>
      </Dialog>
      <MidButton variant="contained" onClick={() => editClick()} style={editStyle}>{(edit)? "Update" : "Edit"}</MidButton>
      <MidButton variant="contained" onClick={() => setProfileStatus(["home", ""])}>Back</MidButton>
    </>
  );
}