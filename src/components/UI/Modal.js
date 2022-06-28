import { useContext } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppContext } from '../../store/AppContext';
import { colors } from '../../utils/colors';
import Button from './Button';

const ModalComp = ({ setModalVisible, modalVisible, item, title, navigation, TYPE }) => {
  const { state, dispatch } = useContext(AppContext);

  const handlePress = () => {
    let newCartTotal;

    if (item?.title) {
      const sameItem = state.cart.find(product => product.id === item.id);

      if (sameItem) {
        newCartTotal = {
          cart: state.cart.map(book =>
            book.id === item.id
              ? {
                  ...book,
                  quantity: +book.quantity + 1,
                }
              : book
          ),
          totalPrice: state.totalPrice + item.cost,
        };
      } else
        newCartTotal = {
          cart: [...state.cart, item],
          totalPrice: state.totalPrice + item.cost,
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

    setModalVisible(!modalVisible);

    dispatch({ type: `${TYPE}`, payload: item ? item : '' });

    if (TYPE === 'PLACE_ORDER') {
      const removeCartTotal = async () => {
        try {
          await AsyncStorage.removeItem('CartTotal');
        } catch (e) {
          console.log(e);
        }
      };
      removeCartTotal();

      dispatch({ type: 'RESET_DISCOUNT_APPLIED' });

      navigation.navigate('OrderPlaced');
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>
          <View style={styles.modalBtnsContainer}>
            <Button
              pressable={({ pressed }) => [styles.button, pressed && styles.pressed]}
              text={styles.textStyle}
              onPress={() => setModalVisible(!modalVisible)}
            >
              Cancel
            </Button>

            <Button
              pressable={({ pressed }) => [styles.button, pressed && styles.pressed]}
              text={styles.textStyle}
              onPress={handlePress}
            >
              Yes
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  modalBtnsContainer: {
    flexDirection: 'row',
    width: 170,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    elevation: 2,
    backgroundColor: colors.teal,
  },

  textStyle: {
    fontFamily: 'Montserrat_700Bold',
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
    color: '#585858',
  },
  pressed: {
    opacity: 0.75,
  },
});
export default ModalComp;
