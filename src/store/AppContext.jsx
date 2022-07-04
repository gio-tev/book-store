import { createContext, useReducer } from 'react';
import decreaseQuantity from '../utils/decreaseQuantity';
import increaseQuantity from '../utils/increaseQuantity';
import addToCart from '../utils/addToCart';

export const AppContext = createContext();

const initialState = {
  networkAvailable: true,
  accounts: [],
  currentLoggedUser: {},
  selectedBook: {},
  cart: [],
  totalPrice: 0,
  orders: [],
  promoCode: '',
  discountApplied: false,
};

const reducer = (state, action) => {
  if (action.type === 'NETWORK_INFO') {
    return { ...state, networkAvailable: action.payload };
  }
  if (action.type === 'LOAD_ACCOUNTS') {
    return { ...state, accounts: [...action.payload] };
  }
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
    return addToCart(state, action.payload);
  }

  if (action.type === 'DECREASE_QUANTITY') {
    return decreaseQuantity(state, action.payload.cost, action.payload.id);
  }

  if (action.type === 'INCREASE_QUANTITY') {
    return increaseQuantity(state, action.payload.cost, action.payload.id);
  }
  if (action.type === 'PLACE_ORDER') {
    return {
      ...state,
      orders: [...state.cart],
      cart: [],
      totalPrice: 0,
      promoCode: '',
      discountApplied: false,
    };
  }
  if (action.type === 'EDIT_PROFILE') {
    const accountToUpdateIndex = state.accounts.findIndex(account => {
      return account.email === action.payload.email;
    });
    const copyOfAccounts = [...state.accounts];
    copyOfAccounts[accountToUpdateIndex] = action.payload;
    const updatedAccounts = [...copyOfAccounts];

    return {
      ...state,
      accounts: updatedAccounts,
      currentLoggedUser: action.payload,
    };
  }
  if (action.type === 'PROMO_CODE') {
    return {
      ...state,
      promoCode: action.payload,
    };
  }
  if (action.type === 'UPDATE_TOTAL') {
    return {
      ...state,
      totalPrice: action.payload,
      discountApplied: true,
    };
  }
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
