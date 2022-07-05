import { useEffect, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';

import { AppContext } from '../store/AppContext';
import { fetchAccounts } from '../utils/https';
import asyncStorage from '../utils/asyncStorage';

const AsyncStorageWelcome = ({ navigation }) => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch({ type: 'NETWORK_INFO', payload: state.isConnected });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const loadAccounts = async () => {
      const accounts = await fetchAccounts();

      if (accounts === 'Network request failed') {
        return dispatch({ type: 'NETWORK_INFO', payload: false });
      }

      dispatch({ type: 'LOAD_ACCOUNTS', payload: accounts });
    };
    loadAccounts();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const cartTotalResponse = await asyncStorage('getItem', 'CartTotal');

      if (cartTotalResponse !== null) {
        dispatch({
          type: 'UPDATE_CART_AND_TOTAL',
          payload: JSON.parse(cartTotalResponse),
        });
      }

      const accountResponse = await asyncStorage('getItem', 'Account');

      if (accountResponse !== null) {
        dispatch({ type: 'LOGGED_USER', payload: JSON.parse(accountResponse) });
        navigation.replace('DrawerNavigation', { screen: 'Success' });
      } else {
        navigation.replace('Welcome');
      }
    };
    getData();
  }, []);

  return <></>;
};

export default AsyncStorageWelcome;
