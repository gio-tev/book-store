import { useContext } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppContext } from '../store/AppContext';
import Button from './UI/Button';
import { colors } from '../utils/colors';
import decreaseQuantity from '../utils/decreaseQuantity';
import increaseQuantity from '../utils/increaseQuantity';

const CartItem = ({ item }) => {
  const { state, dispatch } = useContext(AppContext);

  const handleDecrease = () => {
    const newCartTotal = decreaseQuantity(state, item.cost, item.id);

    const storeData = async value => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('CartTotal', jsonValue);
      } catch (e) {
        console.log(e);
      }
    };

    storeData(newCartTotal);

    dispatch({ type: 'DECREASE_QUANTITY', payload: item });
  };

  const handleIncrease = () => {
    const newCartTotal = increaseQuantity(state, item.cost, item.id);

    const storeData = async value => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('CartTotal', jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
    storeData(newCartTotal);

    dispatch({ type: 'INCREASE_QUANTITY', payload: item });
  };

  const iconMinus = <AntDesign name="minuscircleo" size={24} color={colors.teal} />;
  const iconPlus = <AntDesign name="pluscircleo" size={24} color={colors.teal} />;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image style={styles.img} source={{ uri: item.cover }} />

        <View style={styles.descriptionBtnsContainer}>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.descriptionCostContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>Author:</Text>
              <Text style={styles.authorPublisher}>{item.author}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>Publisher: </Text>
              <Text style={styles.authorPublisher}>{item.publisher}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>Price: </Text>
              <Text style={styles.cost}>${item.cost}</Text>
            </View>
          </View>

          <View style={styles.btnsQuantityContainer}>
            <Button
              pressable={({ pressed }) => pressed && styles.pressed}
              onPress={handleDecrease}
              icon={iconMinus}
            />

            <Text style={styles.quantity}>{item.quantity}</Text>

            <Button
              pressable={({ pressed }) => pressed && styles.pressed}
              onPress={handleIncrease}
              icon={iconPlus}
            />
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
    marginBottom: 15,
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
    marginTop: -10,
  },
  title: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    fontFamily: 'Montserrat_500Medium',
    color: 'black',
    marginRight: 5,
  },
  authorPublisher: {
    fontFamily: 'Montserrat_500Medium',
    color: colors.darkGrey,
  },
  cost: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 15,
    color: colors.redError,
    marginTop: 2,
  },
  btnsQuantityContainer: {
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantity: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 20,
    color: colors.darkGrey,
    paddingHorizontal: 10,
  },
  pressed: {
    transform: [{ scale: 1.2 }],
  },
});

export default CartItem;
