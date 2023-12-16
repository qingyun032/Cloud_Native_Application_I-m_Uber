import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import { tripInfo } from '../../../models/trip';

type ArrivalProps = {
  setIsArrival: (status: boolean) => void;
  setIsRating: (status: boolean) => void;
}

function Arrival( props: ArrivalProps ) {
  const { setIsArrival, setIsRating } = props;

  const [trip, setTrip] = useState<tripInfo|null>(null)

  useEffect( () => {
    fetch('http://localhost:4000/api/v1/passengers/getArrivalTime')
    // fetch('http://localhost:8000/CarInfo')
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data)
      setTrip(data);
    });
    // try{
    //   const response = getArrivalTime()
    //   setTrip(response)
    // }
    // catch(error: any){
    //   console.log(error)
    // }
  }, [])

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
        <Typography variant='h3' sx={{mb: 5}}>{trip?.dest_arrival_time}</Typography>
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