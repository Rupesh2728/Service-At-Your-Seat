// context.js


// Admin to Theatre array transfer

import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
    
  const [dataArray, setDataArray] = useState([]);

  return (
    <MyContext.Provider value={{ dataArray, setDataArray }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
