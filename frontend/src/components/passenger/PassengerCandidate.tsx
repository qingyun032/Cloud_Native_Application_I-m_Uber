import { ThemeProvider } from '@emotion/react';
import { Button, Paper, Typography, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import createTheme from '@mui/material/styles/createTheme';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CandidateDetail from './CandidateDetail';
import { NavigationBar } from '../navigation/NavigationBar';
import { candidateInfo } from '../../models/trip';


type PassengerCandidateProps = {
  isGo: boolean;
  setIsGo: (isGo: boolean) => void;
  passengerStatus: string;
  setPassengerStatus: (status: string) => void;
  candidates: candidateInfo[];
  setCandidates: (candidates: candidateInfo[]) => void
  setSelectedDriverId: (status: number) => void
}

function PassengerCandidate( props: PassengerCandidateProps) {

  const { isGo, setIsGo, passengerStatus, setPassengerStatus, candidates, setCandidates, setSelectedDriverId } = props;

  const [driverIsShown, setDriverIsShown] = useState(false);
  // const [Drivers, setDrivers] = useState([
  //   {name : "Driver 1", rating : 4.5},
  //   {name : "Driver 2", rating : 4},
  //   {name : "Driver 3", rating : 5},
  //   {name : "Driver 4", rating : 3},
  // ]);

  // const [candidateInfos, setCandidateInfos] = useState([
  //   {id: 0, driver: Drivers[0], stop: "台灣大學", destination: "台積電新竹一廠", car: "Mercedes", money: 100, departureTime: "7:00 a.m.", arrivalTime: "8:30 a.m."},
  //   {id: 1, driver: Drivers[1], stop: "c", destination: "d", car: "BMW", money: 120, departureTime: "7:30 a.m.", arrivalTime: "9:00 a.m."},
  //   {id: 2, driver: Drivers[2], stop: "e", destination: "f", car: "Porsche", money: 140, departureTime: "8:00 a.m.", arrivalTime: "9:30 a.m."},
  //   {id: 3, driver: Drivers[3], stop: "g", destination: "h", car: "Toyota", money: 80, departureTime: "8:30 a.m.", arrivalTime: "10:00 a.m."},
  // ])

  // setCandidates(mockcandidates); // remove after API
  
  const [shownCandidate, setShownCandidate] = useState<candidateInfo>(candidates[0]);
  
  const navigate = useNavigate()
  const toPassengerHomePage = () => {
    setPassengerStatus('home')
  }

  const showCandidateDetail = (candidate: candidateInfo) => {
    setDriverIsShown(current => !current);
    setShownCandidate(candidate);
  }

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
        <Container maxWidth="xs">
          <NavigationBar></NavigationBar>
          <Container 
            sx={{
              width: 0.8
            }}
          >
          {driverIsShown === false &&
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              minHeight="90vh"
            >
              <Typography variant="h4" sx={{ mt: 2, mb: 2}}>
               Trips
              </Typography>
              <Paper
                style={{ maxHeight: 450 , overflow: 'auto'}}         
              >
              {candidates.map((candidate)=>(
                <Button 
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    height : 100,
                    textTransform : "none",
                    mb: 1, 
                  }}
                  onClick={() => showCandidateDetail(candidate)}
                >
                  {candidate.driverName}
                </Button>
              ))}
              {/* <Button onClick={()=> {setCandidates(mockcandidates); console.log("set mock candidate")}}>set mock candidates</Button>
              <Button onClick={()=> {console.log(candidates)}}>show candidates to console</Button> */}
              </Paper>

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
          {driverIsShown === true && <CandidateDetail isGo={isGo} setDriverIsShown={setDriverIsShown} candidate={shownCandidate} passengerStatus={passengerStatus} setPassengerStatus={setPassengerStatus} setSelectedDriverId={setSelectedDriverId}/>}    
          </Container>
        </Container>
      {/* </ThemeProvider> */}
    </>
  )
}

export default PassengerCandidate