import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { NavigationBar } from '../../navigation/NavigationBar';
import { User } from './User';
import { Car } from './Car';

// TODO: use global define user type
type car = {
  brand: string,
  type: string,
  seat: string,
  license: string
}

type user = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  home: string;
  company: string;
  wallet: string;
  start: string;
  destination: string;
  time: string;
  people: string;
  driver: boolean,
  car: car
}

type UserInfoProps = {
  setStatus: (status: string) => void;
  user: user;
  setUser: (user: user) => void;
}

export const UserInfo = (props: UserInfoProps) => {
  const { setStatus, user, setUser } = props;
  const [value, setValue] = useState("user");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Typography component="h1" variant="h5" color="primary">
        User Info
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          pt: "20px",
          pb: "20px",
          minHeight: "75vh"
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="UserInfo label">
              <Tab label="User" value="user" sx={{textTransform: 'none'}}/>
              <Tab label="Car" value="car" sx={{textTransform: 'none'}}/>
            </TabList>
          </Box>
          <TabPanel value="user"><User setStatus={setStatus} user={user} setUser={setUser}/></TabPanel>
          <TabPanel value="car"><Car setStatus={setStatus} user={user} setUser={setUser}/></TabPanel>
        </TabContext>
      </Box>
    </>
  );
}