import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import { AppContext } from '../store/AppContext';
import { AntDesign } from '@expo/vector-icons';

const CartItem = ({ item }) => {
  const { dispatch } = useContext(AppContext);

  const handleDecrease = () => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: item });
  };
  const handleIncrease = () => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: item });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image style={styles.img} source={{ uri: item.cover }} />

        <View style={styles.descriptionBtnsContainer}>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.descriptionCostContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>By:</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>

            <Text style={styles.cost}>${item.cost}</Text>
          </View>

          <View style={styles.btnsQuantityContainer}>
            <Pressable onPress={handleDecrease}>
              <AntDesign name="minuscircleo" size={24} color="#877be3" />
            </Pressable>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Pressable onPress={handleIncrease}>
              <AntDesign name="pluscircleo" size={24} color="#877be3" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  img: {
    width: '35%',
    height: 150,
  },
  descriptionBtnsContainer: {
    width: '65%',
    justifyContent: 'space-between',
    paddingLeft: 20,
  },
  descriptionCostContainer: {
    marginTop: -40,
  },
  title: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 18,
    color: '#877be3',
    marginBottom: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  description: {
    fontFamily: 'Montserrat_500Medium',
    color: 'grey',
    marginRight: 5,
  },
  author: {
    fontFamily: 'Montserrat_500Medium',
    color: '#303030',
  },
  cost: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 15,
    color: '#FF3131',
    marginTop: 2,
  },
  btnsQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 20,
    color: 'grey',
    paddingHorizontal: 10,
  },
});

export default CartItem;