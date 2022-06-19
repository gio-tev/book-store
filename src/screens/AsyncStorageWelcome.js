import { useEffect, useContext } from 'react';
import { AppContext } from '../store/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageWelcome = ({ navigation }) => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await fetch(
        'https://book-store-ac9bf-default-rtdb.firebaseio.com/accounts.json'
      );

      const data = await response.json();

      const transformedAccounts = [];

      for (const [key, value] of Object.entries(data)) {
        const transforemdAccount = {
          ...value,
          id: key,
        };
        transformedAccounts.push(transforemdAccount);
      }

      dispatch({ type: 'LOAD_ACCOUNTS', payload: transformedAccounts });
    };
    fetchAccounts();
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
