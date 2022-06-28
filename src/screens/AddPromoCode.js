import { useContext } from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppContext } from '../store/AppContext';
import { colors } from '../utils/colors';
import Button from '../components/UI/Button';

const AddPromoCode = () => {
  const { state, dispatch } = useContext(AppContext);
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeActive, setPromoCodeActive] = useState(false);
  const [saved, setSaved] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleCodeInput = code => {
    setPromoCode(code);
  };
  const handleFocus = () => setPromoCodeActive(true);
  const handleBlur = () => setPromoCodeActive(false);

  const handleDiscountPress = () => {
    if (state.discountApplied) {
      setDiscountApplied(true);
      return;
    }
    if (state.promoCode === promoCode && !state.discountApplied) {
      const discountedTotalPrice = state.totalPrice - state.totalPrice * 0.2;
      const saved = state.totalPrice * 0.2;

      setSaved(saved.toFixed(2));
      dispatch({ type: 'UPDATE_TOTAL', payload: discountedTotalPrice.toFixed(2) });

      const newCartTotal = {
        cart: [...state.cart],
        totalPrice: discountedTotalPrice,
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
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Please enter code</Text>

      <View style={styles.promoContainer}>
        <TextInput
          onChangeText={handleCodeInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[styles.promoInput, promoCodeActive && styles.promoInputActive]}
          placeholder="Promo Code"
          value={promoCode}
        />
        {discountApplied && <Text style={styles.error}>Discount already applied.</Text>}
        <Button
          pressable={({ pressed }) => [styles.promoBtn, pressed && styles.pressed]}
          text={styles.promoTxt}
          onPress={handleDiscountPress}
        >
          APPLY
        </Button>
      </View>

      <View style={styles.pricesContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.titles}>Total Price:</Text>
          <Text style={styles.total}>${state.totalPrice}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.titles}>You Saved:</Text>
          <Text style={styles.saved}>${saved}</Text>
        </View>
      </View>
    </View>
  );
};

export default AddPromoCode;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    // backgroundColor: 'grey',
    // flex: 1,
    // width: '100%',
    alignItems: 'center',
  },
  mainTitle: {
    fontFamily: 'Montserrat_500Medium',
    color: colors.darkGrey,
    fontSize: 20,
    textAlign: 'center',
    // paddingHorizontal: 20,
    marginBottom: 30,
  },
  promoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  promoInput: {
    color: 'grey',
    borderBottomWidth: 0.4,
    borderBottomColor: 'grey',
    height: 50,
    width: '80%',
    textAlign: 'center',
  },
  promoInputActive: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  promoBtn: {
    backgroundColor: colors.teal,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 100,
    marginTop: 30,
  },
  promoTxt: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 11,
    color: '#fff',
  },
  pressed: {
    opacity: 0.75,
  },
  error: {
    fontFamily: 'Montserrat_500Medium',
    color: colors.redError,
    marginTop: 5,
    fontSize: 12,
  },
  pricesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    borderBottomWidth: 0.4,
    borderBottomColor: 'grey',
  },
  titles: {
    marginRight: 5,
    color: 'grey',
    fontSize: 15,
  },
  total: {
    fontSize: 15,
    // color: 'grey',
    // marginLeft: 5,
  },
  saved: {
    fontSize: 15,
    color: colors.redError,
    // marginLeft: 5,
  },
});
