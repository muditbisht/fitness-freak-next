import React, { useState, createContext } from 'react';

interface INavContext  {
    leftnav: [boolean, (s: boolean) => any];
}

const NavContext = createContext<INavContext>({
  leftnav: [false, ()=>null]
});

const NavProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [leftNav, setLeftNav] = useState(false);

  return (
    <NavContext.Provider value={{leftnav: [leftNav, setLeftNav]}}>
      {children}
    </NavContext.Provider>
  );
};

export { NavContext, NavProvider };