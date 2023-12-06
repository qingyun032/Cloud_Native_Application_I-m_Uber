import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { userInfo, userMode } from '../models/user.model';
import { ProfileSelection } from "../components/profile/ProfileSelection";
import { UserInfo } from "../components/profile/userInfo/UserInfo";
import { FavRoute } from '../components/profile/favRoute/FavRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#313944'
    }
  }
});

enum ProfileStatus {
  Home = "home",
  UserInfo = "userInfo",
  FavRoute = "favRoute",
  CarInfo = "carInfo",
}

export const ProfilePage = () => {
  // const {state} = useLocation();
  // const { isDriver, name } = state;
  const [ status, setStatus ] = useState<string>(ProfileStatus.Home);
  // TODO: use context or parent page pass user information
  const [ user, setUser ] = useState<userInfo>({
    name: "example",
    email: "123@gmail.com",
    phone: "0900000000",
    gender: "Male",
    home: "台北市中正區思源街16-3號",
    company: "桃園市龍潭區龍園六路101號",
    wallet: "100",
    driver: true,
    mode: userMode.Driver,
    favRoute: {
      passenger: {
        start: "台北市中正區思源街16-3號",
        destination: "桃園市龍潭區龍園六路101號",
        time: "09:00",
        people: "2",
      },
      driver: {
        start: "台北市中正區思源街16-3號",
        destination: "桃園市龍潭區龍園六路101號",
        time: "10:00",
        stops: ["1", "2", "3"],
      }
    },
    car: {brand: "Mercedes-Benz", type: "Sedan", seat: "4", license: "ABC-9999"},
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '95vh',
          }}
        >
          <CssBaseline />
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                ml: 3,
                mr: 3,
                pt: "30px",
                pl: "20px",
                pr: "20px",
                minHeight: "70vh"
              }}
            >
              {status === "home" && <ProfileSelection setStatus={setStatus} />}
              {status === "userInfo" && <UserInfo setStatus={setStatus} user={user} setUser={setUser}/>}
              {status === "favRoute" && <FavRoute setStatus={setStatus} user={user} setUser={setUser}/>}
            </Box>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}