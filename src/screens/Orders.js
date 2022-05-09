import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Modal,
  FlatList,
} from 'react-native';
import { AppContext } from '../store/AppContext';
import OrdersItem from '../components/OrdersItem';

const Orders = ({ navigation }) => {
  const { state } = useContext(AppContext);
  const DATA = state.orders;

  const handlePress = () => {
    navigation.navigate('DrawerNavigation');
  };

  return (
    <View style={styles.container}>
      <View style={styles.ordersContainer}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <OrdersItem item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ordersContainer: {
    width: '95%',
    // borderLeftColor: 'lightgrey',
    // borderRightColor: 'lightgrey',
    // borderLeftWidth: 2,
    // borderRightWidth: 2,
    alignSelf: 'center',
  },
  total: {
    height: 50,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
    color: '#6200EE',
  },
});

export default Orders;
