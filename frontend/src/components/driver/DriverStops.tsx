import { Button, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import carImage from '../../blue_car.png';
import Container from '@mui/material/Container';
import React, { useState } from 'react'
import { NavigationBar } from '../navigation/NavigationBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Modal as BaseModal } from '@mui/base/Modal';
import { styled, css } from '@mui/system';
import clsx from 'clsx';
import { Stop } from '../../models/stop.model';
import dayjs, { Dayjs } from 'dayjs';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ItineraryData, DriverRoute, DriverFav, Boarding } from '../../models/journey.model';
import { createRoute, updateDriverFav, showBoardingInfo } from '../../apis/driver.journey.api';

type DriverStopsProps = {
  setDriverStatus: (status: string) => void;
  setBoardingInfo: (boarding: Boarding[]) => void;
  itineraryData: ItineraryData;
  stops: Stop[];
  isGo: boolean;
}

const stops = [
  {
      "stopID": 3,
      "Name": "National Taiwan University",
      "address": "台北市中正區blablabla"
  },
  {
      "stopID": 7,
      "Name": "Taipei 101",
      "address": "台北市信義區blablabla"
  },
  {
    "stopID": 2,
    "Name": "heu",
    "address": "blablabla"
  },
  {
      "stopID": 4,
      "Name": "4",
      "address": "信義區"
  },
  {
      "stopID": 5,
      "Name": "5",
      "address": "龍潭區"
  },
  {
    "stopID": 6,
    "Name": "6",
    "address": "台"
  },
  {
    "stopID": 77,
    "Name": "7",
    "address": "北"
  },
  {
    "stopID": 8,
    "Name": "8",
    "address": "市"
  },
  {
    "stopID": 10,
    "Name": "10",
    "address": "龍潭"
  },
  {
    "stopID": 111,
    "Name": "TSMC",
    "address": "桃園市龍潭區blablabla"
  },
]

export const DriverStops = (props: DriverStopsProps) => {
  const { setDriverStatus, isGo, itineraryData, setBoardingInfo, stops } = props; // TODO: add stops
  const [checked, setChecked] = useState<number[]>([0]);
  const [modalAddress, setModalAddress] = useState<string>("")
  const [open, setOpen] = React.useState(false);
  const [saveFavRoute, setSaveFavRoute] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleOpen = (idx: number) => {
    const [ stopID, Name, address ] = Object.values(stops[idx]);
    setModalAddress(String(address));
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const toDriverHome = () => {
    setDriverStatus('start')
  }

  const handleCheckboxChange = () => {
    setSaveFavRoute((prevValue) => !prevValue);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  const showError = () => {
    setSnackbarOpen(true);
  };

  const getStopsIDs = () => {
    if (checked.length === 0) {
      showError();
      throw new Error('No stop selected');
    }
    const sortedStopIDs = stops.map(stop => {
      const stopID = Object.values(stop)[0];
      return typeof stopID === 'string' ? parseInt(stopID, 10) : stopID as number;
    });
    const selectedStopIDs: number[] = checked.sort((a, b) => a - b).map(index => sortedStopIDs[index]);
    if (isGo) {
      if (selectedStopIDs[selectedStopIDs.length - 1] !== 111) {
        selectedStopIDs.push(111);
      }
    }
    else {
      if (selectedStopIDs[0] !== 111) {
        selectedStopIDs.unshift(111);
      }
    }
    return selectedStopIDs;
  }

  const createDriverRoute = async () => {
    const selectedStopIDs = getStopsIDs();

    const combinedDateTimeString: string | null =
      itineraryData.date &&
      itineraryData.time &&
      itineraryData.date
        .year(itineraryData.date.year())
        .month(itineraryData.date.month())
        .date(itineraryData.date.date())
        .hour(itineraryData.time.hour())
        .minute(itineraryData.time.minute())
        .second(itineraryData.time.second())
        .millisecond(itineraryData.time.millisecond())
        .format('YYYY-MM-DDTHH:mm:ss.SSSZ') || null;
    
    const routeData: DriverRoute = {
      startTime: combinedDateTimeString ? combinedDateTimeString : "", //TODO: change time format
      // startTime: "2023-12-21T15:00:00.000Z",
      state: "PROCESSING",
      stopIds: selectedStopIDs,
      available: parseInt(itineraryData.passengerCount, 10),
      type: isGo ? "GO" : "BACK",
    }

    try {
      const response = await createRoute(routeData);
      return response;
    }
    catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  const updateDriverFavRoute = async () => {
    const formattedTimeString: string | null =
      itineraryData.time &&
      itineraryData.time.format('HH:mm:ss') || null;
    const selectedStopIDs = getStopsIDs();
    
    const favData: DriverFav = {
      GO: {
        address: isGo ? itineraryData.start : null,
        time: isGo ? formattedTimeString : null,
        stopIDs: isGo ? selectedStopIDs : [],
      },
      BACK: {
        address: isGo ? null : itineraryData.destination,
        time: isGo ? null : formattedTimeString,
        stopIDs: isGo ? [] : selectedStopIDs,
      }
    }
    // const favData: DriverFav = {
    //   "GO": {
    //       "address": "台北市大安區羅斯福路四段一號",
    //       "time": "07:00:00",
    //       "stopIDs": [12, 24, 63, 7, 2, 111] // 最後一個是台積電
    //   },
    //   "BACK": {
    //       "address": "台北市大安區羅斯福路四段一號", // null
    //       "time": "23:07:20",
    //       "stopIDs": [111, 2, 7, 63, 24, 12]
    //   }  
    // }
    try {
      const response = await updateDriverFav(favData);
      return response;
    }
    catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  const getBoardingInfo = async () => {
    try {
      const response = await showBoardingInfo();
      setBoardingInfo(response.stops);
      console.log(response)
      return response;
    }
    catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  const toDriverWaitJourney = async () => {
    try {
        const routeResponse = await createDriverRoute();
        if (saveFavRoute) {
          const facResponse = await updateDriverFavRoute();
        }
        const boardingResponse = await getBoardingInfo();
        console.log(boardingResponse)
        setDriverStatus('waitJourney')
    }
    catch (error: any) {
        console.log(error);
    }
    // setDriverStatus('waitJourney') // TODO: remove this line
  }

  return (
    <>
        <Container maxWidth="xs">
          <NavigationBar></NavigationBar>
          <Container 
            sx={{
              width: 0.8
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={carImage} style={{width: 150}}/>
              <Typography variant="h5" sx={{mb: 2}}>
                Stops
              </Typography>
            </Box>
            <Box sx={{ width: '100%', height: '400px', overflowY: 'auto' }}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {stops.map((stop, idx) => {
                  const [ stopID, Name, address ] = Object.values(stop);
                  return (
                    <ListItem
                      key={stopID}
                      secondaryAction={
                        <IconButton edge="end" aria-label="comments" onClick={()=>handleOpen(idx)}>
                          <CommentIcon />
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton role={undefined} onClick={handleToggle(idx)} dense>
                        <ListItemIcon>
                          {stopID !== 111 ?
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(idx) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': `${idx}` }}
                            />:<></>
                          }
                        </ListItemIcon>
                        <ListItemText id={`label-${idx}`} primary={Name} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
            <Box sx={{mt:2}}>
              <Checkbox checked={saveFavRoute} onChange={handleCheckboxChange} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
              Save to favorite route
            </Box>
            <Modal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={open}
              onClose={handleClose}
              slots={{ backdrop: StyledBackdrop }}
            >
              <ModalContent sx={{ width: 400 }}>
                <p id="unstyled-modal-description" className="modal-description">
                  {modalAddress}
                </p>
              </ModalContent>
            </Modal>
            <Button            
              variant="contained"
              fullWidth
              sx={{
                backgroundColor : "secondary.main",
                textTransform : "none",
                mb: 2, mt: 2,
                height: 40,
              }}
              onClick={toDriverHome}
            >
              Back
            </Button>
            <Button            
              variant="contained"
              fullWidth
              sx={{
                backgroundColor : "secondary.main",
                textTransform : "none",
                mb: 2, mt: 1,
                height: 40,
              }}
              onClick={toDriverWaitJourney}
            >
              Confirm and Start
            </Button>
            <Box>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
              >
                <Alert onClose={handleSnackbarClose} severity="error">
                  No stop selected!
                </Alert>
              </Snackbar>
            </Box>
          </Container>
        </Container>
    </>
  )
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);