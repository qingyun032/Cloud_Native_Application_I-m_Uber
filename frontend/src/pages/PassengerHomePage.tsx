import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PassengerCandidatePage from './PassengerCandidatePage';
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

export const PassengerHomePage = () => {

  const navigate = useNavigate()
  const toPassengerCandidatePage = () => {
    navigate('/passengerCandidate')
  }

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
              // maxWidth: "430px",
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
                />
                Destination
                <TextField
                  fullWidth
                  label="Enter your destination location"
                  size="small"
                  sx={{ mb: 1.5, mt: 1 }}
                />
                Passenger Count
                <TextField
                  fullWidth
                  label="Enter your passenger count"
                  size="small"
                  sx={{ mb: 1.5, mt: 1 }}
                />
                <Box
                  display="flex"
                  flexDirection="row"
                >
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
