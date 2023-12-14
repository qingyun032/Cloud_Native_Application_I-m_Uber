import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import carImage from '../../blue_car.png';
import Container from '@mui/material/Container';
import React, { useState } from 'react'
import { NavigationBar } from '../navigation/NavigationBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Modal as BaseModal } from '@mui/base/Modal';
import { styled, css } from '@mui/system';
import clsx from 'clsx';
import { Boarding } from "../../models/journey.model"
import { finishRoute } from "../../apis/driver.journey.api"

type DriverOnJourneyProps = {
  boardingInfo: Boarding[] | null;
  setDriverStatus: (status: string) => void;
}

const boarding = [
  {
      "stopID": 103,
      "name": "樹林區公所",
      "passengers": [
          {
              "name": "Leo",
              "count": 1, 
              "type": "pickUp"
          },
          {
              "name": "Chu",
              "count": 1, 
              "type": "dropOff"
          }
      ],
      "address": "新北市博愛街198-5號對側",
      "latitude": 24.93555000000000000,
      "longitude": 121.71021000000000000,
      "boardTime": "2023-12-21T12:06:29.000Z"
  },
  {
      "stopID": 13,
      "name": "中國醫藥大學新竹附設醫院",
      "passengers": [
          {
              "name": "Wei",
              "count": 1
          },
      ],
      "address": "新竹縣博愛南路/興隆路一段口(東北側)",
      "latitude": 24.7342000000000000,
      "longitude": 121.88381000000000000,
      "boardTime": "2023-12-21T14:07:29.000Z"
  },
  {
      "stopID": 20,
      "name": "台積電",
      "passengers": [],
      "address": "新竹縣寶山鄉園區二路168號",
      "latitude": 24.13535000000000000,
      "longitude": 121.72321000000000000,
      "boardTime": "2023-12-21T15:25:20.000Z"
  }
]

export const DriverOnJourney = (props: DriverOnJourneyProps) => {
  const { setDriverStatus, boardingInfo } = props; // TODO: Replace boarding with boardingInfo
  const [modalAddress, setModalAddress] = useState<string>("")
  const [open, setOpen] = React.useState(false);
  const handleOpen = (idx: number) => {
    setModalAddress(boarding[idx].address);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  
  const toDriverEndJourney = async () => {
    try {
        const response = await finishRoute();
        console.log(response);
        setDriverStatus('endJourney')
    }
    catch (error: any) {
        console.log(error);
    }
    setDriverStatus('endJourney') // TODO: remove this line after API worked
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
              <img src={carImage} style={{width: 120}}/>
              <Typography variant="h5" sx={{mb: 2}}>
                On the way!
              </Typography>
            </Box>
            <Box sx={{ width: '100%', height: '400px', overflowY: 'auto', mt: 9 }}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {boarding.map((stop, idx) => {
                  return (
                    <ListItem key={idx} onClick={()=>handleOpen(idx)}>
                      <ListItemAvatar>
                        {/* <p>{stop.boardTime}</p>  TODO: show the time here?*/} 
                        <Avatar>
                        <img src={carImage} style={{width: 50}}/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`${stop.name} ${stop.boardTime}`} secondary={`${stop.passengers.length} ${stop.passengers.length > 1 ? "people" : "person"}`}
 />
                    </ListItem>
                  )})
                }
              </List>
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
                mb: 2, mt: 5,
                height: 40,
              }}
              onClick={toDriverEndJourney}
            >
              End Journey
            </Button>
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