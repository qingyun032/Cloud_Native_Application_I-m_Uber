import { createContext, useContext, ReactNode, useState } from 'react';
import { userInfo } from '../models/user.model';
import { Boarding } from '../models/journey.model';

interface UserContextType {
  user: userInfo | null;
  setUser: (userData: userInfo | null) => void;
  profileStatus: [string, string];
  setProfileStatus: (profileStatus: [string, string]) => void;
  lastHome: string;
  setLastHome: (lastHome: string) => void;
  driverStatus: string;
  setDriverStatus: (driverStatus: string) => void;
  boardingInfo: Boarding[];
  setBoardingInfo: (boarding: Boarding[]) => void;
}

enum ProfileStatus {
  Home = "home",
  UserInfo = "userInfo",
  FavRoute = "favRoute",
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<userInfo | null>(null);
  const [boardingInfo, setBoardingInfo] = useState<Boarding[]>([]);
  const [ profileStatus, setProfileStatus ] = useState<[string, string]>(["home", ""]);
  const [driverStatus, setDriverStatus] = useState<string>('start')
  const [ lastHome, setLastHome ] = useState<string>("/passengerHome");

  return (
    <UserContext.Provider value={{ user, setUser, profileStatus, setProfileStatus, lastHome, setLastHome, driverStatus, setDriverStatus, boardingInfo, setBoardingInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};