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
    wallet: 100,
    driver: true,
    mode: userMode.Driver,
    favRoute: {
      passenger: {
        Go: {
          address: "台北市大安區羅斯福路四段一號",
          passengerCnt: 1,
          time: "08:54:21" 
        },
        Back: {
          address: "台北市大安區羅斯福路四段一號",
          passengerCnt: 1,
          time: "18:54:12" 
        }
      },
      driver: {
        Go: {
          address: "台北市大安區羅斯福路四段一號",
          time: "07:00:00",
          stopIDs: [12, 24, 63, 7, 2, 111],
          stopNames: ["竹北遠東百貨", "至善公園", "汐止火車站", "香山天后宮", "國賓大飯店", "大安站"]
        },
        Back: {
          address: "台北市大安區羅斯福路四段一號",
          time: "23:07:20",
          stopIDs: [111, 2, 7, 63, 24, 12],
          stopNames: ["大安站", "國賓大飯店", "香山天后宮", "汐止火車站", "至善公園", "竹北遠東百貨"]
        }
      }
    },
    car: {brand: "Mercedes-Benz", type: "Sedan", seat: "4", license: "ABC-9999", color: 1, electric: false},
    nCancel: 0,
    rating: "4.5",
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