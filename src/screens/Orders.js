import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { AppContext } from '../store/AppContext';
import OrdersItem from '../components/OrdersItem';
import EmptyContent from '../components/EmptyContent';

const Orders = () => {
  const { state } = useContext(AppContext);
  const DATA = state.orders;

  return (
    <View style={styles.container}>
      <View style={styles.ordersContainer}>
        {DATA.length > 0 ? (
          <FlatList
            data={DATA}
            renderItem={({ item }) => <OrdersItem item={item} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <EmptyContent icon={'Orders'} title={'You do not have any orders'} />
        )}
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
