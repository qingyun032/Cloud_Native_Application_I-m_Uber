import { useState, useRef, RefObject } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useUserContext } from '../../../contexts/UserContext';

const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px",
  background: "#9C694C",
});

const HalfButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "130px"
});

type UserProps = {
  setStatus: (status: string) => void;
}

export const User = (props: UserProps) => {
  const { setStatus } = props;
  const [ edit, setEdit ] = useState<boolean>(false);
  const [ topUp, setTopUp ] = useState<boolean>(false);
  const { user, setUser } = useUserContext();
  const refs: { [key:string]: RefObject<HTMLDivElement> } = {
    home: useRef<HTMLDivElement>(null),
    company: useRef<HTMLDivElement>(null),
    wallet: useRef<HTMLDivElement>(null),
  }
  const genderMap = (s: string) => {
    if(s === "M") return "Male";
    else if(s === "F") return "Female";
    else if(s === "O") return "Other";
  }
  const textMap = [
    {id: "name", label: "User name", user: (user === null)? null : user.name},
    {id: "email", label: "Email", user: (user === null)? null : user.email},
    {id: "phone", label: "Phone number", user: (user === null)? null : user.phone},
    {id: "gender", label: "Gender", user: (user === null)? null : genderMap(user.gender)},
    {id: "home", label: "Home address", user: (user === null)? null : user.home},
    {id: "company", label: "Company address", user: (user === null)? null : user.company},
    {id: "wallet", label: "Wallet", user: (user === null)? null : user.wallet}
  ]

  const Text = styled(TextField)({
    width: "275px",
    paddingBottom: "10px",
    input: {
      color: "#000000",
    },
    '#wallet-label': {
      color: (topUp)? "#313944" : "darkgrey",
      fontWeight: "bold",
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
    style: {
      fontSize: "14px",
    },
  }

  const walletProps = {
    disabled: !topUp,
    style: {
      fontSize: "14px"
    }
  }

  const editClick = () => {
    if(edit){
      setUser((user === null)? null :
        {
          ...user,
          home: refs["home"].current?.getElementsByTagName("input")[0].value ?? user.home,
          company: refs["company"].current?.getElementsByTagName("input")[0].value ?? user.company,
        }
      )
    }
    setEdit(!edit);
  }

  const topUpClick = () => {
    if(topUp)
      refs["wallet"].current?.getElementsByTagName("input")[0].focus();
    setTopUp(!topUp);
  }

  return (
    <>
      {textMap.map(({ id, label, user }) => (
        (id === "wallet")?
        <Text
          key={id}
          id={id}
          label={label}
          type="number"
          defaultValue={user}
          ref={refs[id]}
          variant="standard"
          InputProps={{...walletProps, startAdornment: <InputAdornment position="start">$</InputAdornment>}}
        />
        :
        <Text
          key={id}
          id={id}
          label={label}
          defaultValue={user}
          ref={refs[id]}
          variant="standard"
          disabled={(id === "name" || id === "email" || id === "phone" || id === "gender")? true : !edit}
          InputProps={inputProps}
        />
      ))}
      <div style={{ width: "275px", display: 'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '5px' }}>
        <HalfButton variant="contained" onClick={() => editClick()}>{(edit)? "Update" : "Edit"}</HalfButton>
        <HalfButton variant="contained" onClick={() => topUpClick()}>{(topUp)? "Comfirm" : "Top up"}</HalfButton>
      </div>
      <MidButton variant="contained" onClick={() => setStatus("home")}>Back</MidButton>
    </>
  );
}