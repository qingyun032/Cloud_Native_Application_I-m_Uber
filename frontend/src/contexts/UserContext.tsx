import { createContext, useContext, ReactNode, useState } from 'react';
import { userInfo } from '../models/user.model';

interface UserContextType {
  user: userInfo | null;
  setUser: (userData: userInfo | null) => void;
  profileStatus: [string, string];
  setProfileStatus: (profileStatus: [string, string]) => void;
  lastHome: string;
  setLastHome: (lastHome: string) => void;
}

enum ProfileStatus {
  Home = "home",
  UserInfo = "userInfo",
  FavRoute = "favRoute",
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<userInfo | null>(null);
  const [ profileStatus, setProfileStatus ] = useState<[string, string]>(["home", ""]);
  const [ lastHome, setLastHome ] = useState<string>("/passengerHome");

  return (
    <UserContext.Provider value={{ user, setUser, profileStatus, setProfileStatus, lastHome, setLastHome }}>
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