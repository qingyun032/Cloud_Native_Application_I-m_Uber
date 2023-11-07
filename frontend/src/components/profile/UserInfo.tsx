import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';

type UserInfoProps = {
    setStatus: (status: string) => void;
}

export const UserInfo = (props: UserInfoProps) => {
    const { setStatus } = props;
    return (
        <div>
            User Info
            <Button variant="contained">Update</Button>
            <Button variant="contained" onClick={()=>setStatus("home")}>Back</Button>
        </div>
    );
}