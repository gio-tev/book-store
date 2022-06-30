import { useContext } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { AppContext } from '../store/AppContext';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../utils/colors';
import Button from './UI/Button';

const CartItem = ({ item }) => {
  const { state, dispatch } = useContext(AppContext);

  const handleDecrease = () => {
    let reducedPriceWithDiscount;
    let reducedTotalPrice;

    if (state.discountApplied) {
      reducedTotalPrice = state.cart
        .map(book => book.cost * book.quantity)
        .reduce((prev, cur) => prev + cur);

      reducedPriceWithDiscount =
        reducedTotalPrice - item.cost - (reducedTotalPrice - item.cost) * 0.2;
    }

    const sameItem = state.cart.find(product => product.id === item.id);

    let newCartTotal;

    if (sameItem && sameItem.quantity === 1 && state.cart.length === 1) {
      newCartTotal = {
        ...state,
        cart: [],
        totalPrice: 0,
        promoCode: '',
        discountApplied: false,
      };
    }
    if (sameItem && sameItem.quantity === 1) {
      newCartTotal = {
        cart: state.cart.filter(book => book.id !== item.id),
        totalPrice:
          state.discountApplied && state.totalPrice < item.cost
            ? 0
            : state.discountApplied && state.totalPrice > item.cost
            ? reducedPriceWithDiscount
            : !state.discountApplied && state.totalPrice < item.cost
            ? 0
            : state.totalPrice - item.cost,
      };
    } else {
      newCartTotal = {
        cart: state.cart.map(book =>
          book.id === item.id
            ? {
                ...book,
                quantity: book.quantity - 1,
              }
            : book
        ),
        totalPrice: state.discountApplied
          ? reducedPriceWithDiscount
          : state.totalPrice - item.cost,
      };
    }

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
    let increasedPriceWithDiscount;
    let reducedTotalPrice;

    if (state.discountApplied) {
      reducedTotalPrice = state.cart
        .map(book => book.cost * book.quantity)
        .reduce((prev, cur) => prev + cur);

      increasedPriceWithDiscount =
        reducedTotalPrice + item.cost - (reducedTotalPrice + item.cost) * 0.2;
    }

    let newCartTotal = {
      cart: state.cart.map(book =>
        book.id === item.id
          ? {
              ...book,
              quantity: +book.quantity + 1,
            }
          : book
      ),
      totalPrice: state.discountApplied
        ? increasedPriceWithDiscount
        : state.totalPrice + item.cost,
    };

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
