import React, { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
  accounts: [
    {
      Name: 'Giorgi Tevdorashvili',
      Email: 'test@gmail.com',
      Phone: '123456',
      Password: '654321',
    },
  ],
};

const reducer = (state, action) => {
  if (action.type === 'NEW_ACCOUNT') {
    return { ...state, accounts: [...state.accounts, action.payload] };
  }
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
