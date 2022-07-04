import { useContext } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';

import { AppContext } from '../../store/AppContext';
import Button from './Button';
import { colors } from '../../utils/colors';
import addToCart from '../../utils/addToCart';
import asyncStorage from '../../utils/asyncStorage';

const ModalComp = ({ setModalVisible, modalVisible, item, title, navigation, TYPE }) => {
  const { state, dispatch } = useContext(AppContext);

  const handlePress = () => {
    if (item?.title) {
      const newCartTotal = addToCart(state, item);

      asyncStorage('setItem', 'CartTotal', newCartTotal);
    }

    if (TYPE === 'PLACE_ORDER') {
      asyncStorage('removeItem', 'CartTotal');

      navigation.navigate('OrderPlaced');
    }

    dispatch({ type: `${TYPE}`, payload: item ? item : '' });

    setModalVisible(!modalVisible);
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
