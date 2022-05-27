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
  totalPrice: 0,
  orders: [],
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
  if (action.type === 'LOG_OUT') {
    return { ...state, currentLoggedUser: {}, orders: [] };
  }
  if (action.type === 'UPDATE_CART_AND_TOTAL') {
    return {
      ...state,
      cart: [...action.payload.cart],
      totalPrice: action.payload.totalPrice,
    };
  }
  if (action.type === 'ADD_TO_CART') {
    const sameItem = state.cart.find(
      product => product.id === action.payload.id
    );

    if (sameItem) {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
        totalPrice: state.totalPrice + action.payload.cost,
      };
    }
    return {
      ...state,
      cart: [...state.cart, action.payload],
      totalPrice: state.totalPrice + action.payload.cost,
    };
  }

  if (action.type === 'DECREASE_QUANTITY') {
    const sameItem = state.cart.find(
      product => product.id === action.payload.id
    );

    if (sameItem && sameItem.quantity === 1) {
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
        totalPrice: state.totalPrice - action.payload.cost,
      };
    } else {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        ),
        totalPrice: state.totalPrice - action.payload.cost,
      };
    }
  }

  if (action.type === 'INCREASE_QUANTITY') {
    return {
      ...state,
      cart: state.cart.map(item =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      ),
      totalPrice: state.totalPrice + action.payload.cost,
    };
  }
  if (action.type === 'PLACE_ORDER') {
    return { ...state, orders: [...state.cart], cart: [], totalPrice: 0 };
  }
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
