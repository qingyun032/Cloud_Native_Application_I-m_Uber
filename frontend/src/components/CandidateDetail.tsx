import { ThemeProvider } from '@emotion/react';
import { Button, Container, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import createTheme from '@mui/material/styles/createTheme';
import React from 'react'
import { CandidateInfo } from '../pages/PassengerCandidatePage';
import { useNavigate } from 'react-router-dom';

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
          {/* <Container sx={{ width : 1}}> */}
            <Typography variant="h4">
               Itinerary detail
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              minHeight="80vh"
            >
              <Typography sx={{ mt:2 }}>Name</Typography>
              <Typography variant='h5'>
                {candidate.driver.name}
              </Typography>
              <Divider/>
              <Typography sx={{ mt:2 }}>Ratings</Typography>
              <Typography variant='h5'>
                {candidate.driver.rating}
              </Typography>
              <Divider/>
              <Typography sx={{ mt:2 }}>Stop</Typography>
              <Typography variant='h5'>
                {candidate.stop}
              </Typography>
              <Divider/>
              <Typography sx={{ mt:2 }}>Destination</Typography>
              <Typography variant='h5'>
                {candidate.destination}
              </Typography>
              <Divider/>
              <Typography sx={{ mt:2 }}>Car</Typography>
              <Typography variant='h5'>
                {candidate.car}
              </Typography>
              <Divider/>
              <Typography sx={{ mt:2 }}>Money</Typography>
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
                Confirm
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
          {/* </Container> */}
        {/* </Box> */}
      </ThemeProvider>
    </>
  )
}

export default CandidateDetail