import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react'

type ArrivalProps = {
  setIsArrival: (status: boolean) => void;
  setIsRating: (status: boolean) => void;
}

function Arrival( props: ArrivalProps ) {
  const { setIsArrival, setIsRating } = props;

  const handleClick = () => {
    setIsArrival(false);
    setIsRating(true);
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant='body1' sx={{mt: 5, mb: 2}}>Estimated Arrival Time</Typography>
        <Typography variant='h3' sx={{mb: 5}}>8:50 a.m.</Typography>
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
          Give your ratings!
        </Button>
      </Box>
    </>
  )
}

export default Arrival