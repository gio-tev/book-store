import React, { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
  accounts: [
    {
      name: 'Giorgi Tevdorashvili',
      email: 'test@gmail.com',
      phone: '123456',
      password: '654321',
      image:
        'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    },
  ],
  currentLoggedUser: {},
  selectedBook: {},
  cart: [],
};

const reducer = (state, action) => {
  if (action.type === 'NEW_ACCOUNT') {
    return { ...state, accounts: [...state.accounts, action.payload] };
  }
  if (action.type === 'SELECTED_BOOK') {
    return { ...state, selectedBook: { ...action.payload } };
  }
  if (action.type === 'LOGGED_USER') {
    return { ...state, currentLoggedUser: { ...action.payload } };
  }
  if (action.type === 'ADD_TO_CART') {
    return { ...state, cart: [...state.cart, action.payload] };
  }
  if (action.type === 'LOG_OUT') {
    return { ...state, currentLoggedUser: {} };
  }
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.cart);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
