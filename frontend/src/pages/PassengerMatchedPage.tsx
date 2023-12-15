import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import carImage from '../blue_car.png';
import React, { useState } from 'react'
import Arrival from '../components/matching/Arrival';
import Departure from '../components/matching/Departure';
import MyRating from '../components/matching/Rating';
import { NavigationBar } from '../components/navigation/NavigationBar';
import { useUserContext } from '../contexts/UserContext';


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
    ].join(',')
  }
});

function PassengerMatchedpage() {

  // const [isDeparture, setIsDeparture] = useState(true);
  // const [isArrival, setIsArrival] = useState(false);
  // const [isRating, setIsRating] = useState(false);
  const { isDeparture, setIsDeparture, isArrival, setIsArrival, isRating, setIsRating } = useUserContext();
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs">
          <NavigationBar></NavigationBar>
          <Container 
            sx={{
              width: 0.8,
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <img src={carImage}/>
            {isDeparture === true && <Departure setIsArrival={setIsArrival} setIsDeparture={setIsDeparture}/>}
            {isArrival === true && <Arrival setIsArrival={setIsArrival} setIsRating={setIsRating}/>}
            {isRating === true && <MyRating setIsRating={setIsRating} />}

            {/* <Button variant='contained' fullWidth sx={{backgroundColor: 'secondary.main', textTransform: 'none'}}>I'm in the Car</Button> */}
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default PassengerMatchedpage

