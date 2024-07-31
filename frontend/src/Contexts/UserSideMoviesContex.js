import React, { createContext, useContext, useState } from 'react';

const MyContext2 = createContext();

const MyProvider2 = ({ children }) => {
    
  const [userDataArray, setUserDataArray] = useState([]);

  return (
    <MyContext2.Provider value={{userDataArray, setUserDataArray}}>
      {children}
    </MyContext2.Provider>
  );
};

export { MyContext2, MyProvider2 };