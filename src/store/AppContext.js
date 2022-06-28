import { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
  accounts: [],
  currentLoggedUser: {},
  selectedBook: {},
  cart: [],
  totalPrice: 0,
  orders: [],
  networkAvailable: false,
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
    const sameItem = state.cart.find(product => product.id === action.payload.id);

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
    const sameItem = state.cart.find(product => product.id === action.payload.id);

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
  if (action.type === 'RESET_DISCOUNT_APPLIED') {
    return {
      ...state,
      promoCode: '',
      discountApplied: false,
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
