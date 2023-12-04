import { useState, useRef, RefObject } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { userInfo } from '../../../models/user.model';

const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px",
  background: "#9C694C",
});

type CarProps = {
  setStatus: (status: string) => void;
  user: userInfo;
  setUser: (user: userInfo) => void;
}

export const Car = (props: CarProps) => {
  const { setStatus, user, setUser } = props;
  const [ edit, setEdit ] = useState<boolean>(false);
  const refs: { [key:string]: RefObject<HTMLDivElement> } = {
    brand: useRef<HTMLDivElement>(null),
    type: useRef<HTMLDivElement>(null),
    seat: useRef<HTMLDivElement>(null),
    license: useRef<HTMLDivElement>(null),
  }
  const textMap = [
    {id: "brand", label: "Brand", user: user.car.brand},
    {id: "type", label: "Type", user: user.car.type},
    {id: "seat", label: "Number of seats", user: user.car.seat},
    {id: "license", label: "License plate", user: user.car.license},
  ]

  const Text = styled(TextField)({
    width: "275px",
    paddingBottom: "10px",
    input: {
      color: "#000000",
    },
    label: {
      color: (edit)? "#313944" : "darkgrey",
      fontWeight: "bold",
    },
    '& .MuiSelect-select.Mui-disabled': {
      color: "#000000",
    },
  })

  const inputProps = {
    disabled: !edit,
    style: {
      fontSize: "14px",
    },
  }

  const editStyle = {
    background: "#313944",
    marginTop: "10px",
    marginBottom: "5px",
  }

  const alertStyle = {
    display: (user.driver)? "none" : "flex",
    marginBottom: "10px",
  }

  const editClick = () => {
    if(edit){
      setUser({
        ...user,
        car: {
          brand: refs["brand"].current?.getElementsByTagName("input")[0].value ?? user.car.brand,
          type: refs["type"].current?.getElementsByTagName("input")[0].value ?? user.car.type,
          seat: refs["seat"].current?.getElementsByTagName("input")[0].value ?? user.car.seat,
          license: refs["license"].current?.getElementsByTagName("input")[0].value ?? user.car.license,
        }
      })
    }
    setEdit(!edit);
  }

  return (
    <>
      <Alert severity="error" style={alertStyle}>You are not a driver!</Alert>
      {textMap.map(({ id, label, user }) => (
        <Text
          key={id}
          id={id}
          label={label}
          defaultValue={user}
          ref={refs[id]}
          variant="standard"
          InputProps={inputProps}
        />
      ))}
      <MidButton variant="contained" onClick={() => editClick()} style={editStyle}>{(edit)? "Update" : "Edit"}</MidButton>
      <MidButton variant="contained" onClick={() => setStatus("home")}>Back</MidButton>
    </>
  );
}