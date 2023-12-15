import { ThemeProvider } from '@emotion/react';
import { Button, Card, Container, Divider, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import createTheme from '@mui/material/styles/createTheme';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { candidateInfo } from '../models/trip';
import { brandList } from '../models/carBrand';
import { selectCandidate } from '../apis/passenger.api';


type CandidateProps = {
  isGo: boolean,
  setDriverIsShown: (status: boolean) => void;
  candidate: candidateInfo;
  passengerStatus: string;
  setPassengerStatus: (status: string) => void;
  setSelectedDriverId: (status: number) => void;
}

const CandidateDetail = ( props: CandidateProps ) => {
  const { isGo, setDriverIsShown, candidate, passengerStatus, setPassengerStatus, setSelectedDriverId } = props;

  const closeDriverDetail = () => {
    setDriverIsShown(false);
  }

  const navigate = useNavigate();
  const toPassengerMatched = async () => {
    // send selectCandidate API
    const candidateDetail = {
      routeID: candidate.routeID,
      stopID: candidate.stopID,
      price: candidate.price
    }
    try{
      const response = await selectCandidate(candidateDetail);
      console.log(response)
    }
    catch(error : any){
      console.log(error)
    }
    setPassengerStatus('matched')
    setSelectedDriverId(candidate.driverID)
    // navigate('/passengerMatched')
  }

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
          {/* <Paper elevation={12}> */}
            <Typography variant="h4" sx={{ mt: 4, }}>
               Itinerary detail
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              minHeight="80vh"
            >
              <Box
                display="flex"
                flexDirection="row"
                sx = {{ justifyContent: 'space-between' }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                >
                  <Typography sx={{ mt:1 }}>Name</Typography>
                  <Typography variant='h5'>
                    {candidate.driverName}
                  </Typography>
                  <Divider/>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ ml: 6 }}
                >
                  <Typography sx={{ mt:1 }}>Driver Rating</Typography>
                  <Typography variant='h5'>
                    {candidate.rating}
                  </Typography>
                  <Divider/>
                </Box>
              </Box>              
              <Box
                display="flex"
                flexDirection="row"
                sx = {{ justifyContent: 'space-between' }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                >
                  <Typography sx={{ mt:2 }}>Departure Time</Typography>
                  <Typography variant='h5'>
                    {candidate.board_time}
                  </Typography>
                  <Divider/>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ ml: 2 }}
                >
                  <Typography sx={{ mt:2 }}>Arrival Time</Typography>
                  <Typography variant='h5'>
                    Not described in shownCandidate API
                    {/* {candidate.arrivalTime} */}
                  </Typography>
                  <Divider/>
                </Box>
              </Box>
              <Typography sx={{ mt:2 }}>Departure Stop</Typography>
              <Typography variant='h5'>
                {isGo? candidate.stopID : "台積電"}
                {/* {candidate.stopAddress} */}
              </Typography>
              <Divider/>
              <Typography sx={{ mt:2 }}>Destination</Typography>
              <Typography variant='h5'>
                {isGo? "台積電" : candidate.stopID}
                {/* {candidate.destination} */}
              </Typography>
              <Divider/>
              <Typography sx={{ mt:2 }}>Car Model</Typography>
              <Typography variant='h5'>
                {/* need to map to string */}
                {brandList[candidate.carbrand]} 
              </Typography>
              <Divider/>
              <Typography sx={{ mt:2 }}>Cost</Typography>
              <Typography variant='h5'>
                {candidate.price}
              </Typography>
              <Divider/>
              <Button 
                variant='contained' 
                fullWidth
                sx={{
                  backgroundColor: 'secondary.main',
                  mt: 2,
                }}
                onClick={toPassengerMatched}
              >
                Confirm and pay
              </Button>
              <Button 
                variant='contained' 
                fullWidth 
                sx={{
                  backgroundColor: 'primary.main',
                  mt: 2,
                  mb: 2,
                }}
                onClick={closeDriverDetail}
              >
                Go Back
              </Button>
            </Box>
          {/* </Paper> */}
        {/* </Box> */}
      {/* </ThemeProvider> */}
    </>
  )
}

export default CandidateDetail