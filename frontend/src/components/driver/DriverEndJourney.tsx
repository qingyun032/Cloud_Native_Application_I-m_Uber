import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import carImage from '../../blue_car.png';
import Container from '@mui/material/Container';
import createTheme from '@mui/material/styles/createTheme';
import React, { useState } from 'react'
import { NavigationBar } from '../navigation/NavigationBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Modal as BaseModal } from '@mui/base/Modal';
import { styled, css } from '@mui/system';
import clsx from 'clsx';

type DriverEndJourneyProps = {
  setDriverStatus: (status: string) => void;
}


export const DriverEndJourney = (props: DriverEndJourneyProps) => {
  const toDriverHome = () => {
    props.setDriverStatus('start')
  }

  return (
    <>
        <Container maxWidth="xs">
          <NavigationBar></NavigationBar>
          <Container 
            sx={{
              width: 0.8
            }}
          >
            <Box
              sx={{
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img src={carImage} style={{width: 250, marginTop: 100}}/>
              <Typography variant='subtitle1' sx={{mt: 2, mb: 2}}>You have finish your journey!</Typography>
              <Button 
                variant='contained' 
                fullWidth 
                sx={{
                  backgroundColor: 'secondary.main', 
                  textTransform: 'none',
                  mt: 10
                }}
                onClick={toDriverHome}
              >
                Confirm
              </Button>
            </Box>
          </Container>
        </Container>
    </>
  )
}