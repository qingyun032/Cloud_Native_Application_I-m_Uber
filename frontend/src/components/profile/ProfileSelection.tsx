import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type ProfileSelectionProps = {
  setStatus: (status: string) => void;
}

const BigButton = styled(Button)({
  textTransform: 'none',
  fontSize: "24px",
  height: "80px",
  width: "275px"
});

export const ProfileSelection = (props: ProfileSelectionProps) => {
  const { setStatus } = props;
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/home', { state: { isDriver: false, name: 'Joey' }})
  }
  return (
    <>
      <Typography component="h1" variant="h5" color="primary">
        User Profile
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
          minHeight: "50vh"
        }}
      >
        <BigButton variant='contained' onClick={() => setStatus("userInfo")}>User Info</BigButton>
        <BigButton variant='contained' onClick={() => setStatus("favRoute")}>Favorite Route</BigButton>
      </Box>
      {/* Profile Selection
      <div>
        <Button variant="contained" onClick={()=>setStatus("userInfo")}>User Info</Button>
      </div>
      <div className={styles["test"]}>
        <Button variant="contained" onClick={onClick}>Home</Button>
      </div> */}
    </>
  );
}