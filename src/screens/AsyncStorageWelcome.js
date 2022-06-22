import { useEffect, useContext } from 'react';
import { AppContext } from '../store/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAccounts } from '../utils/https';

const AsyncStorageWelcome = ({ navigation }) => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const loadAccounts = async () => {
      const accounts = await fetchAccounts();
      dispatch({ type: 'LOAD_ACCOUNTS', payload: accounts });
    };
    loadAccounts();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const cartTotal = await AsyncStorage.getItem('CartTotal');
        if (cartTotal !== null) {
          dispatch({
            type: 'UPDATE_CART_AND_TOTAL',
            payload: JSON.parse(cartTotal),
          });
        }
        const account = await AsyncStorage.getItem('Account');
        if (account !== null) {
          dispatch({ type: 'LOGGED_USER', payload: JSON.parse(account) });
          navigation.replace('DrawerNavigation', { screen: 'Home' });
        } else {
          navigation.replace('Welcome');
        }
      } catch (e) {
        console.log(e);
      }
      // await AsyncStorage.clear();
    };
    getData();
  }, []);

  return <></>;
};

export default AsyncStorageWelcome;
