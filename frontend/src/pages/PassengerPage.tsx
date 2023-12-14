import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { candidateInfo, itineraryData } from "../models/trip"
import dayjs from 'dayjs';
import { PassengerHome } from './PassengerHome';
import PassengerCandidate from './PassengerCandidate';
import PassengerMatched from './PassengerMatched';

const theme = createTheme({
    palette: {
      primary: {
        main: '#313944'
      },
      secondary: {
        main: '#9C694C'
      }
    }
});

export const PassengerPage = () => {
    const [passengerStatus, setPassengerStatus] = useState<string>('home')
    const [isGo, setIsGo] = useState<boolean>(true)
    const [candidates, setCandidates] = useState<candidateInfo[]>([])
    // const [stops, setStops] = useState<Stop[]>([])
    const [passengerItineraryData, setPassengerItineraryData] = useState<itineraryData>({
        start: "",
        destination: "台積電",
        passengerCount: "4",
        date: dayjs(),
        time: dayjs(),
      });

    return (
        <>
          <ThemeProvider theme={theme}>
              {passengerStatus === 'home' && <PassengerHome passengerStatus={passengerStatus} setPassengerStatus={setPassengerStatus} passengerItineraryData={passengerItineraryData} setPassengerItineraryData={setPassengerItineraryData}/>}
              {passengerStatus === 'candidate' && <PassengerCandidate passengerStatus={passengerStatus} setPassengerStatus={setPassengerStatus} candidates={candidates} setCandidates={setCandidates}/>}
              {passengerStatus === 'matched' && <PassengerMatched passengerStatus={passengerStatus} setPassengerStatus={setPassengerStatus} />}
          </ThemeProvider>
        </>
    )
}