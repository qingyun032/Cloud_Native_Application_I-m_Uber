import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

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

interface ItineraryData {
  start: string;
  destination: string;
  passengerCount: number;
  // date: Dayjs;
  // time: Dayjs;
}

export const PassengerHomePage = () => {

  const navigate = useNavigate()
  const toPassengerCandidatePage = () => {
    navigate('/passengerCandidate')
  }

  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const [itineraryData, setItineraryData] = useState({
    start: "",
    destination: "",
    passengerCount: 1,
  });

  const handleInputChange = (field: keyof ItineraryData, value: string | number) => {
    setItineraryData((prevItineraryData) => ({
        ...prevItineraryData,
        [field]: value,
    }));
    console.log(itineraryData)
  };


  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs">
          {/* Navigation Bar */}
          <Box
            sx={{
              // display: "flex",
              // alignItems: "center",
              // flexDirection: "column",
              backgroundColor : 'primary.main',
              height: "90px",
            }}
          ></Box>
          <Container 
            sx={{
              width: 0.8
            }}
          >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            minHeight="80vh"
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
                <TextField
                  fullWidth
                  label="Enter your passenger count"
                  size="small"
                  sx={{ mb: 1.5, mt: 1 }}
                  value={itineraryData.passengerCount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('passengerCount', e.target.value)}
                />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
                </LocalizationProvider> */}
                {/* <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} /> */}
                <Box
                  display="flex"
                  flexDirection="row"
                >
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="Controlled picker"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                  </LocalizationProvider> */}
                  <Box
                    sx={{ mr:3 }}
                  >
                  Date
                    <TextField
                      fullWidth
                      label="Today"
                      size="small"
                      sx={{ mb: 1.5, mt: 1 }}
                    />
                  </Box>
                  <Box
                    sx={{ ml:2 }}
                  >
                  Time
                    <TextField
                      fullWidth
                      label="Now"
                      size="small"
                      sx={{ mb: 1.5, mt: 1 }}
                    />
                  </Box>
                </Box>
                <Button variant="contained" fullWidth onClick={toPassengerCandidatePage}
                  sx={{
                    textTransform : "none",
                    backgroundColor : "secondary.main",
                    mb: 1, mt: 1,
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
