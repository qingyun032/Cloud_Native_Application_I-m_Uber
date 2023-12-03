import { ThemeProvider } from '@emotion/react';
import { Button, Typography, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import createTheme from '@mui/material/styles/createTheme';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CandidateDetail from '../components/CandidateDetail';

const theme = createTheme({
  palette: {
    primary: {
      main: '#313944'
    },
    secondary: {
      main: '#9C694C'
    }
  },
  typography: {
    fontFamily: [
      'Poppins',
      // 'sans-serif'
    ].join(',')
  }
});

export interface Driver {
  name : string;
  rating : number;
}

export interface CandidateInfo {
  id : number;
  driver : Driver;
  stop : string;
  destination : string;
  car : string;
  money : number;
  departureTime : string;
  arrivalTime : string;
}


function PassengerCandidatePage() {

  const [driverIsShown, setDriverIsShown] = useState(false);
  const [Drivers, setDrivers] = useState([
    {name : "Driver 1", rating : 4.5},
    {name : "Driver 2", rating : 4},
    {name : "Driver 3", rating : 5},
    {name : "Driver 4", rating : 3},
  ]);

  const [candidateInfos, setCandidateInfos] = useState([
    {id: 0, driver: Drivers[0], stop: "台灣大學", destination: "台積電新竹一廠", car: "Mercedes", money: 100, departureTime: "7:00 a.m.", arrivalTime: "8:30 a.m."},
    {id: 1, driver: Drivers[1], stop: "c", destination: "d", car: "BMW", money: 120, departureTime: "7:30 a.m.", arrivalTime: "9:00 a.m."},
    {id: 2, driver: Drivers[2], stop: "e", destination: "f", car: "Porsche", money: 140, departureTime: "8:00 a.m.", arrivalTime: "9:30 a.m."},
    {id: 3, driver: Drivers[3], stop: "g", destination: "h", car: "Toyota", money: 80, departureTime: "8:30 a.m.", arrivalTime: "10:00 a.m."},
  ])

  const [shownCandidate, setShownCandidate] = useState(candidateInfos[0]);
  
  const navigate = useNavigate()
  const toPassengerHomePage = () => {
    navigate('/passengerHome')
  }

  const showDriverDetail = (id: number) => {
    setDriverIsShown(current => !current);
    setShownCandidate(candidateInfos[id]);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs">
          {/* Navigation Bar */}
          <Box
            sx={{
              // display: "flex",
              // alignItems: "center",
              // flexDirection: "column",
              backgroundColor : 'primary.main',
              height: "90px",
            }}
          ></Box>
          <Container 
            sx={{
              width: 0.8
            }}
          >
            {/* {isSignIn === true && <SignIn setIsSignIn={setIsSignIn} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />} */}
          {driverIsShown === false &&
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              minHeight="80vh"
            >
              {candidateInfos.map((candidateInfo)=>(
                <Button 
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    height : 80,
                    textTransform : "none",
                    mb: 2, mt: 2,
                  }}
                  onClick={() => showDriverDetail(candidateInfo.id)}
                >
                  {candidateInfo.driver.name}
                </Button>
              ))}
                <Button            
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor : "secondary.main",
                    textTransform : "none",
                    mb: 2, mt: 5,
                    height: 40,
                  }}
                  onClick={toPassengerHomePage}
                >
                  Back
                </Button>
            </Box>
          }
          {driverIsShown === true && <CandidateDetail setDriverIsShown={setDriverIsShown} candidate={shownCandidate} />}    
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default PassengerCandidatePage