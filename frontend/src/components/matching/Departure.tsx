import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react'

type DepartureProps = {
  setIsDeparture: (status: boolean) => void;
  setIsArrival: (status: boolean) => void;
}

function Departure( props: DepartureProps ) {
  const { setIsArrival, setIsDeparture } = props;

  const handleClick = () => {
    setIsDeparture(false);
    setIsArrival(true);
  }

  return (
    <>
      <Box
        // minHeight= "70vh"
        sx={{
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant='body1' sx={{mt: 5, mb: 2}}>Estimated Departure Time</Typography>
        <Typography variant='h3' sx={{mb: 5}}>7:30 a.m.</Typography>
        <Button 
          variant='contained' 
          fullWidth 
          sx={{
            backgroundColor: 'secondary.main', 
            textTransform: 'none',
            mt: 10
          }}
          onClick={handleClick}
        >
          I am in the Car
        </Button>
      </Box>
    </>
  )
}

export default Departure