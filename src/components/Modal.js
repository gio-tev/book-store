import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Text, Modal } from 'react-native';
import { AppContext } from '../store/AppContext';

const ModalComp = ({
  setModalVisible,
  modalVisible,
  item,
  title,
  navigation,
  TYPE,
}) => {
  const { dispatch } = useContext(AppContext);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {/* Are you sure you want to add item in cart ? */}
            {title}
          </Text>
          <View style={styles.modalBtnsContainer}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                // dispatch({ type: 'ADD_TO_CART', payload: item });
                dispatch({ type: `${TYPE}`, payload: item ? item : '' });
                setModalVisible(!modalVisible);
                if (TYPE === 'PLACE_ORDER') navigation.navigate('OrderPlaced');
              }}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
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
    // marginTop: 22,
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
  },
  buttonClose: {
    backgroundColor: '#6200EE',
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
});
export default ModalComp;
