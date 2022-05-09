import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Pressable,
} from 'react-native';
// import DATA from '../../api/book.json';
import CartItem from '../components/CartItem';
import { AppContext } from '../store/AppContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ModalComp from '../components/Modal';

const Cart = ({ navigation }) => {
  const { state } = useContext(AppContext);
  const DATA = state.cart;
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(!modalVisible);
    // Show modal and order placed component
  };

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
        <FlatList
          // numColumns={1}
          data={DATA}
          renderItem={({ item }) => <CartItem item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.promoTotalContainer}>
        <View style={styles.promoContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name="price-ribbon" size={24} color="#6200EE" />
            <Text style={styles.promo}>Add Promo Code</Text>
          </View>
          {/* <FontAwesome name="long-arrow-right" size={24} color="black" /> */}
          {/* <FontAwesome5 name="arrow-right" size={20} color="#6200EE" /> */}
        </View>

        <View style={styles.priceBtnContainer}>
          <View style={styles.totalsContainer}>
            <Text style={styles.total}>TOTAL</Text>
            <Text style={styles.totalPrice}>${state.totalPrice}</Text>
            <Text style={styles.free}>Free Domestic Shipping</Text>
          </View>

          <Pressable style={styles.btnContainer} onPress={handlePress}>
            <Text style={styles.btnTxt}>PLACE ORDER</Text>
            <FontAwesome5 name="arrow-right" size={18} color="white" />
          </Pressable>
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
    // flex: 1,
    width: '95%',
    borderLeftColor: 'lightgrey',
    borderRightColor: 'lightgrey',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    alignSelf: 'center',
  },
  promoTotalContainer: {
    position: 'absolute',
    bottom: 0,
    // width: '95%',
    width: '95%',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    padding: 20,
    // width: '80%',
    backgroundColor: '#D8D8D8',
  },
  promo: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 17,
    marginLeft: 10,
    marginRight: 10,
    color: '#6200EE',
  },
  priceBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // alignItems: 'space-between',
    // marginTop: 20,
    backgroundColor: '#D8D8D8',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopColor: 'white',
    borderTopWidth: 0.5,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 100,
  },
  totalsContainer: {
    // width: '60%',
    height: 65,
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  total: {
    fontFamily: 'Montserrat_500Medium',
    color: '#888888',
    // letterSpacing: 0.01,
    fontSize: 13,
  },
  free: {
    fontFamily: 'Montserrat_500Medium',
    color: '#888888',
    fontSize: 13,
  },
  totalPrice: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
    color: '#505050',
  },
  btnTxt: {
    fontFamily: 'Montserrat_700Bold',
    // fontFamily: 'Montserrat_500Medium',
    // fontSize: 15,
    color: 'white',
    marginRight: 5,
  },
});

export default Cart;
