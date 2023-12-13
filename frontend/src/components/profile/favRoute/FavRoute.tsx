import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PassengerRoute } from './PassengerRoute';
import { DriverRoute } from './DriverRoute';
import { infoBarType } from '../../../models/user.model';

type FavRouteProps = {
  setStatus: (status: string) => void;
  setInfoBar: (infoBar: infoBarType) => void;
}

export const FavRoute = (props: FavRouteProps) => {
  const { setStatus, setInfoBar } = props;
  const [value, setValue] = useState("passenger");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Typography component="h1" variant="h5" color="primary">
        Favorite Route
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
            <TabList onChange={handleChange} aria-label="FavRoute label">
              <Tab label="As a passenger" value="passenger" sx={{textTransform: 'none'}}/>
              <Tab label="As a driver" value="driver" sx={{textTransform: 'none'}}/>
            </TabList>
          </Box>
          <TabPanel value="passenger"><PassengerRoute setStatus={setStatus} setInfoBar={setInfoBar}/></TabPanel>
          <TabPanel value="driver"><DriverRoute setStatus={setStatus} setInfoBar={setInfoBar}/></TabPanel>
        </TabContext>
      </Box>
    </>
  );
}