import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { candidateInfo, itineraryData } from "../models/trip"
import dayjs from 'dayjs';
import { PassengerHome } from '../components/passenger/PassengerHome';
import PassengerCandidate from '../components/passenger/PassengerCandidate';
import PassengerMatched from '../components/passenger/PassengerMatched';
import { checkIfPassengerOnRoute } from '../apis/passenger.api';

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

export const PassengerPage = () => {
    const [passengerStatus, setPassengerStatus] = useState<string>('home')
    const [isGo, setIsGo] = useState<boolean>(true)
    // const [carAppearance, setCarAppearance] = useState(["AAA9999", "white"])
    const [selectedDriverId, setSelectedDriverId] = useState(0)
    const [candidates, setCandidates] = useState<candidateInfo[]>(
      [
        {
            "routeID": 2,
            "stopID": 201,
            "stopAddress": "新竹縣新市路93號",
            "stop_lat": 24.901,
            "stop_lon": 120.98532,
            "driverID": 2,
            "driverName": "Chu",
            "board_time": "2023-12-21 08:43:51",
            "destination_time": "2023-12-21 15:00:00",
            "rating": 0,
            "nRating": 0,
            "price": 190,
            "carPlate": "LOVE-9888",
            "cartype": "Sedan",
            "carbrand": 3,
            "carColor": 4,
            "carelectric": false
        }, 
        {
          "routeID": 3,
          "stopID": 201,
          "stopAddress": "新竹縣新市路93號",
          "stop_lat": 24.901,
          "stop_lon": 120.98532,
          "driverID": 2,
          "driverName": "Leo",
          "board_time": "2023-12-21 08:43:51",
          "destination_time": "2023-12-21 15:00:00",
          "rating": 0,
          "nRating": 0,
          "price": 290,
          "carPlate": "LOVE-9888",
          "cartype": "Sedan",
          "carbrand": 3,
          "carColor": 4,
          "carelectric": false
        }
      ]
    )

    useEffect( () => {
      async function checkPassengerStatus() {
        try{
          const response = await checkIfPassengerOnRoute();
          console.log('passenger on route status : ', response)
          response? setPassengerStatus('matched'):setPassengerStatus('home')
        }
        catch(error : any){
          console.log(error)
        }
      }
      checkPassengerStatus();
      // fetch('http://localhost:4000/api/v1/passengers/getArrivalTime')
      // .then(res => {
      //   return res.json();
      // })
      // .then(data => {
      //   console.log(data)
      //   // setTrip(data);
      // });
      // try{
      //   const response = getArrivalTime()
      //   setTrip(response)
      // }
      // catch(error: any){
      //   console.log(error)
      // }
    }, [])

    return (
      <>
        <ThemeProvider theme={theme}>
          {passengerStatus === 'home' && <PassengerHome isGo={isGo} setIsGo={setIsGo} passengerStatus={passengerStatus} setPassengerStatus={setPassengerStatus} candidates={candidates} setCandidates={setCandidates}/>}
          {passengerStatus === 'candidate' && <PassengerCandidate isGo={isGo} setIsGo={setIsGo} passengerStatus={passengerStatus} setPassengerStatus={setPassengerStatus} candidates={candidates} setCandidates={setCandidates} setSelectedDriverId={setSelectedDriverId}/>}
          {passengerStatus === 'matched' && <PassengerMatched passengerStatus={passengerStatus} setPassengerStatus={setPassengerStatus} selectedDriverId={selectedDriverId}/>}
        </ThemeProvider>
      </>
    )
}