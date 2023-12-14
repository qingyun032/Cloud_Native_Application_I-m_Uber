import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { NavigationBar } from '../components/navigation/NavigationBar';
import { itineraryData } from "../models/trip";
import { getCandidate } from '../apis/passenger.api';


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

type PassengerHomeProps = {
  passengerStatus: string;
  setPassengerStatus: (status: string) => void;
  passengerItineraryData: itineraryData;
  setPassengerItineraryData: (status: itineraryData) => void;
}

export const PassengerHome = ( props: PassengerHomeProps ) => {

  const { passengerStatus, setPassengerStatus, passengerItineraryData, setPassengerItineraryData } = props;
  const navigate = useNavigate()
  const toPassengerCandidatePage = async () => {
    // add API to search candidate
    const candidateList = await getCandidate(itineraryData);
    setPassengerStatus('candidate')
  }

  const passengerFavRoute: itineraryData = {
    start: '管二104',
    destination: '德田101',
    passengerCount : '2',
    date: dayjs('2023-12-20'),
    time: dayjs('15:00:00', "HH:mm:ss"),
  }

  const [itineraryData, setItineraryData] = useState({
    toTSMC: true,
    start: "",
    destination: "",
    passengerCount: "1",
    date: dayjs(),
    time: dayjs(),
  });

  const handleInputChange = (field: keyof itineraryData, value: string | number | Dayjs | null) => {
    setItineraryData((prevItineraryData) => ({
        ...prevItineraryData,
        [field]: value,
    }));
  };

  const useFavoriteRoute = () => {
    // add API for favorite route
    handleInputChange('start', passengerFavRoute.start);
    handleInputChange('destination', passengerFavRoute.destination);
    handleInputChange('passengerCount', passengerFavRoute.passengerCount);
    handleInputChange('date', passengerFavRoute.date);
    handleInputChange('time', passengerFavRoute.time);
  }


  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs">
          <NavigationBar></NavigationBar>
          <Container sx={{ width: 0.8 }} >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              minHeight="90vh"
            >
              <div>
                <Typography variant="h4" fontWeight="bold">
                  Start journey 
                </Typography>
                <Button variant="contained" 
                  sx={{
                    textTransform : "none",
                    mb: 2, mt: 2,
                  }}
                  onClick={useFavoriteRoute}
                >
                  Use favorite route
                </Button>
                <div>
                  Start
                  <TextField
                    fullWidth
                    label="Enter your start location"
                    size="small"
                    sx={{ mb: 1.5, mt: 1 }}
                    value={itineraryData.start}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('start', e.target.value)}
                  />
                  Destination
                  <TextField
                    fullWidth
                    label="Enter your destination location"
                    size="small" 
                    sx={{ mb: 1.5, mt: 1 }}
                    value={itineraryData.destination}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('destination', e.target.value)}
                  />
                  Passenger Count
                  <Select
                    fullWidth
                    size='small'
                    sx={{ mb: 1.5, mt: 1 }}
                    value={itineraryData.passengerCount}
                    onChange={(e: SelectChangeEvent) => handleInputChange('passengerCount', e.target.value)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                  </Select>
                  <Box
                    display="flex"
                    flexDirection="row"
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}> 
                      <Box sx={{ mr:2 }} >
                        Date
                        <MobileDatePicker 
                          defaultValue={dayjs()} 
                          slotProps={{ textField: {size: 'small'} }} 
                          sx={{ mt: 1 }}
                          value={itineraryData.date}
                          onChange={(newDate) => handleInputChange('date', newDate)}
                        />
                      </Box>
                      <Box sx={{ ml:1 }} >
                        Time
                        <MobileTimePicker 
                          defaultValue={dayjs()} 
                          slotProps={{ textField: {size: 'small'} }} 
                          sx={{ mt: 1 }}
                          value={itineraryData.time}
                          onChange={(newTime) => handleInputChange('time', newTime)}
                        />
                      </Box>
                    </LocalizationProvider>
                  </Box>
                  <Button variant="contained" fullWidth onClick={toPassengerCandidatePage}
                    sx={{
                      textTransform : "none",
                      backgroundColor : "secondary.main",
                      mb: 1, mt: 3,
                    }}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </Box>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
} 
