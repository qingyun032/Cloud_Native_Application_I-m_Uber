import { useState, useRef, RefObject } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert, { AlertColor } from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import { brandList } from '../../../models/carBrand';
import { useUserContext } from '../../../contexts/UserContext';

const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px",
  background: "#9C694C",
});

type CarProps = {
  setStatus: (status: string) => void;
}

type infoBarType = {
  open: boolean,
  type: AlertColor,
  message: string,
}

export const Car = (props: CarProps) => {
  const { setStatus } = props;
  const [ edit, setEdit ] = useState<boolean>(false);
  const [ infoBar, setInfoBar ] = useState<infoBarType>({open: false, type: "success", message: "success"});
  const { user, setUser } = useUserContext();
  const refs: { [key:string]: RefObject<HTMLDivElement> } = {
    brand: useRef<HTMLDivElement>(null),
    type: useRef<HTMLDivElement>(null),
    seat: useRef<HTMLDivElement>(null),
    license: useRef<HTMLDivElement>(null),
  }
  const textMap = [
    {id: "brand", label: "Brand", user: (user === null || user.car === null)? null : user.car.brand},
    {id: "type", label: "Type", user: (user === null || user.car === null)? null : user.car.type},
    {id: "seat", label: "Number of seats", user: (user === null || user.car === null)? null : user.car.seat},
    {id: "license", label: "License plate", user: (user === null || user.car === null)? null : user.car.license},
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
    display: (user != null && user.driver)? "none" : "flex",
    marginBottom: "10px",
  }

  const editClick = () => {
    if(edit){
      const brand = refs["brand"].current?.getElementsByTagName("input")[0].value;
      const type = refs["type"].current?.getElementsByTagName("input")[0].value;
      const seat = refs["seat"].current?.getElementsByTagName("input")[0].value;
      const license = refs["license"].current?.getElementsByTagName("input")[0].value;
      if(brand === "" && type === "" && seat === "" && license === ""){
      }else if(brand !== "" && type !== "" && seat !== "" && license !== ""){
        setUser((user === null)? null :
          {
            ...user,
            driver: true,
            car: {
              ...user.car,
              brand: brandList.findIndex((i) => i === brand) ?? user.car.brand,
              type: type ?? user.car.type,
              seat: Number(seat) ?? user.car.seat,
              license: license ?? user.car.license,
            }
          }
        )
        console.log(user);
        setInfoBar({open: true, type: "success", message: "Update successfully!"});
      }else{
        setInfoBar({open: true, type: "error", message: "All fields need to be filled."});
      }
    }
    setEdit(!edit);
  }

  return (
    <>
      <Alert severity="error" style={alertStyle}>Please fill in below informations to become a driver.</Alert>
      {textMap.map(({ id, label, user }) => (
        (id === "brand")?
        <Text
          select
          id={id}
          label={label}
          defaultValue={(user === null)? null : brandList[Number(user)]}
          ref={refs[id]}
          variant="standard"
          InputProps={inputProps}
        >
          {brandList.map((option, i) => (
            <MenuItem id={i.toString()} key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Text>
        :
        (id === "type")?
        <Text
          select
          id={id}
          label={label}
          defaultValue={user}
          ref={refs[id]}
          variant="standard"
          InputProps={inputProps}
        >
          <MenuItem key={"SUV"} value={"SUV"}>SUV</MenuItem>
          <MenuItem key={"Sedan"} value={"Sedan"}>Sedan</MenuItem>
        </Text>
        :
        <Text
          key={id}
          id={id}
          label={label}
          type={(id === "seat")? "number" : "initial"}
          defaultValue={user}
          ref={refs[id]}
          variant="standard"
          InputProps={inputProps}
        />
      ))}
      <MidButton variant="contained" onClick={() => editClick()} style={editStyle}>{(edit)? "Update" : "Edit"}</MidButton>
      <MidButton variant="contained" onClick={() => setStatus("home")}>Back</MidButton>
      <Snackbar open={infoBar.open} autoHideDuration={3000} onClose={() => setInfoBar({...infoBar, open: false})}>
        <Alert onClose={() => setInfoBar({...infoBar, open: false})} severity={infoBar.type} sx={{ width: '100%' }}>
          {infoBar.message}
        </Alert>
      </Snackbar>
    </>
  );
}