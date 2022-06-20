import { useContext, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import CartItem from '../components/CartItem';
import { AppContext } from '../store/AppContext';
import { FontAwesome5 } from '@expo/vector-icons';
import ModalComp from '../components/UI/Modal';
import EmptyContent from '../components/EmptyContent';
import { colors } from '../utils/colors';
import Button from '../components/UI/Button';

const Cart = ({ navigation }) => {
  const { state } = useContext(AppContext);
  const DATA = state.cart;
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    state.cart.length > 0 && setModalVisible(!modalVisible);
  };

  const icon = <FontAwesome5 name="arrow-right" size={18} color="white" />;
  return (
    <View style={styles.container}>
      <ModalComp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'Are you sure you want to place order?'}
        navigation={navigation}
        TYPE={'PLACE_ORDER'}
      />

      <View style={styles.booksContainer}>
        {DATA.length > 0 ? (
          <FlatList
            data={DATA}
            renderItem={({ item }) => <CartItem item={item} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <EmptyContent icon={'Cart'} title={'Your cart is empty'} />
        )}
      </View>
      <View style={styles.promoTotalContainer}>
        <View style={styles.promoContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name="price-ribbon" size={24} color={colors.teal} />
            <Text style={styles.promo}>Add Promo Code</Text>
          </View>
        </View>

        <View style={styles.priceBtnContainer}>
          <View style={styles.totalsContainer}>
            <Text style={styles.total}>TOTAL</Text>
            <Text style={styles.totalPrice}>${state.totalPrice}</Text>
            <Text style={styles.free}>Free Domestic Shipping</Text>
          </View>

          <Button
            pressable={({ pressed }) => [
              styles.btnContainer,
              state.cart.length !== 0 && pressed && [styles.btnContainer, styles.pressed],
              state.cart.length === 0 && styles.disableBtn,
            ]}
            text={styles.btnTxt}
            onPress={handlePress}
            icon={icon}
          >
            PLACE ORDER
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  booksContainer: {
    width: '95%',
    height: '75%',
  },
  promoTotalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '95%',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#D8D8D8',
  },
  promo: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 17,
    marginLeft: 10,
    marginRight: 10,
    color: colors.teal,
  },
  priceBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D8D8D8',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopColor: 'white',
    borderTopWidth: 0.5,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brown,
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 100,
  },
  totalsContainer: {
    height: 65,
    justifyContent: 'space-between',
  },
  total: {
    fontFamily: 'Montserrat_500Medium',
    color: 'grey',
    fontSize: 13,
  },
  free: {
    fontFamily: 'Montserrat_500Medium',
    color: 'grey',
    fontSize: 13,
  },
  totalPrice: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
    color: colors.darkGrey,
  },
  btnTxt: {
    fontFamily: 'Montserrat_700Bold',
    color: 'white',
    marginRight: 5,
  },
  disableBtn: {
    backgroundColor: 'grey',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default Cart;
