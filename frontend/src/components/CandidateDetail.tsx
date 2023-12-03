import { ThemeProvider } from '@emotion/react';
import { Button, Card, Container, Divider, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import createTheme from '@mui/material/styles/createTheme';
import React from 'react'
import { CandidateInfo } from '../pages/PassengerCandidatePage';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

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

type CandidateProps = {
  setDriverIsShown: (status: boolean) => void;
  candidate: CandidateInfo;
}

const CandidateDetail = ( props: CandidateProps ) => {
  const { setDriverIsShown, candidate } = props;

  const closeDriverDetail = () => {
    setDriverIsShown(false);
  }

  const navigate = useNavigate();
  const toPassengerMatched = () => {
    navigate('/passengerMatched')
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Box
          sx={{
            height: 636,
            width: 328
          }}
        > */}
          {/* <Paper elevation={12}> */}
            <Typography variant="h4" sx={{ mt: 2, }}>
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
                    {candidate.driver.name}
                  </Typography>
                  <Divider/>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ ml: 8 }}
                >
                  <Typography sx={{ mt:1 }}>Driver Rating</Typography>
                  <Typography variant='h5'>
                    {candidate.driver.rating}
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
                    {candidate.departureTime}
                  </Typography>
                  <Divider/>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ ml: 4 }}
                >
                  <Typography sx={{ mt:2 }}>Arrival Time</Typography>
                  <Typography variant='h5'>
                    {candidate.arrivalTime}
                  </Typography>
                  <Divider/>
                </Box>
              </Box>
              <Typography sx={{ mt:2 }}>Departure Stop</Typography>
              <Typography variant='h5'>
                {candidate.stop}
              </Typography>
              <Divider/>
              <Typography sx={{ mt:2 }}>Destination</Typography>
              <Typography variant='h5'>
                {candidate.destination}
              </Typography>
              <Divider/>
              <Typography sx={{ mt:2 }}>Car Model</Typography>
              <Typography variant='h5'>
                {candidate.car}
              </Typography>
              <Divider/>
              <Typography sx={{ mt:2 }}>Cost</Typography>
              <Typography variant='h5'>
                {candidate.money}
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
      </ThemeProvider>
    </>
  )
}

export default CandidateDetail