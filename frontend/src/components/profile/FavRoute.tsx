import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px"
});

const Text = styled(TextField)({
  width: "275px"
})

type FavRouteProps = {
  setStatus: (status: string) => void;
  User: {
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
    people: number;
  };
}

export const FavRoute = (props: FavRouteProps) => {
  const { setStatus, User } = props;
  const [ readonly, setReadonly ] = useState<boolean>(true);
  return (
    <>
      <Typography component="h1" variant="h5" color="primary">
        Favorite Route
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: 'space-evenly',
          // border: "solid",
          // borderColor: "#e0e0e0",
          // borderRadius: "10px",
          pt: "20px",
          pb: "20px",
          minHeight: "75vh"
        }}
      >
        <Text
          id="start"
          label="Start"
          defaultValue={User.start}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <Text
          id="destination"
          label="Destination"
          defaultValue={User.destination}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <Text
          id="time"
          label="Time"
          defaultValue={User.time}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <Text
          id="people"
          label="Number of people"
          defaultValue={User.people}
          variant="standard"
          InputProps={{
            readOnly: readonly,
            style: {
              fontSize: "14px"
            }
          }}
        />
        <MidButton variant="contained" >Edit</MidButton>
        <MidButton variant="contained" onClick={() => setStatus("home")}>Back</MidButton>
      </Box>
    </>
    // <div>
    //   Favorite route
    //   <Button variant="contained">Update</Button>
    //   <Button variant="contained" onClick={()=>setStatus("home")}>Back</Button>
    // </div>
  );
}