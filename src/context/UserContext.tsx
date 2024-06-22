import React, { useState, createContext } from 'react';
import { UserData } from '@/types'

type IUserContext = [UserData|null, (s: UserData) => any];

const UserContext = createContext<IUserContext>([null, ()=>null]);

const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<UserData|null>(null);

  return (
    <UserContext.Provider value={[ user, setUser ]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };