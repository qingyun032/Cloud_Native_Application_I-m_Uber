import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import { tripInfo } from '../../models/trip';
import { getArrivalTime } from '../../apis/passenger.api';
import { carColor } from '../../models/carColor';

type DepartureProps = {
  setIsDeparture: (status: boolean) => void;
  setIsArrival: (status: boolean) => void;
}

function Departure( props: DepartureProps ) {
  const { setIsArrival, setIsDeparture } = props;
  const [trip, setTrip] = useState<tripInfo|null>(null)

  useEffect( () => {
    // fetch('http://localhost:4000/api/v1/passengers/getArrivalTime')
    fetch('http://localhost:8000/CarInfo')
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
        {/* require modification */}
        {trip && <Typography variant='h3' sx={{mb: 5}}>{trip.stop_arrival_time}</Typography>}
        <Typography variant='body1' sx={{mt: 5, mb: 2}}>Car Appearance</Typography>
        {trip && <Typography variant='h5' sx={{mt: 5, mb: 2}}>{carColor[trip.color]}    {trip.type}</Typography>}
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