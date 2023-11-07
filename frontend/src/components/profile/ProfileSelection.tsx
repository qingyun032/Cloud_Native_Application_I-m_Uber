import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./ProfileSelection.module.scss";
import Button from '@mui/material/Button';

type ProfileSelectionProps = {
    setStatus: (status: string) => void;
}

export const ProfileSelection = (props: ProfileSelectionProps) => {
    const { setStatus } = props;
    const navigate = useNavigate()
    const onClick = () => {
        navigate('/home', { state: { isDriver: false, name: 'Joey' }})
    }
    return (
        <>
            Profile Selection
            <div>
                <Button variant="contained" onClick={()=>setStatus("userInfo")}>User Info</Button>
            </div>
            <div className={styles["test"]}>
                <Button variant="contained" onClick={onClick}>Home</Button>
            </div>
        </>
    );
}