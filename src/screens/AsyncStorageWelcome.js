import { useEffect, useContext } from 'react';
import { AppContext } from '../store/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageWelcome = ({ navigation }) => {
  const { dispatch } = useContext(AppContext);

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
          navigation.navigate('DrawerNavigation', { screen: 'Home' });
        } else {
          navigation.navigate('Welcome');
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
