import * as React from 'react';
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { ProfileSelection } from "../components/profile/ProfileSelection";
import { UserInfo } from "../components/profile/UserInfo";

enum ProfileStatus {
  Home = "home",
  UserInfo = "userInfo",
  FavRoute = "favRoute",
  CarInfo = "carInfo",
}

export const ProfilePage = () => {
  const {state} = useLocation();
  const { isDriver, name } = state;
  const [status, setStatus] = useState<string>(ProfileStatus.Home);
  return (
    <>
      {status === "home" && <ProfileSelection setStatus={setStatus} />}
      {status === "userInfo" && <UserInfo setStatus={setStatus} />}
    </>
  );
}