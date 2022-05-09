import React, { useContext, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { AppContext } from '../store/AppContext';
import { MaterialIcons } from '@expo/vector-icons';
import ModalComp from '../components/Modal';

const Book = () => {
  const { state } = useContext(AppContext);
  const { selectedBook } = state;
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <ModalComp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={selectedBook}
        title={'Are you sure you want to add item in cart ?'}
        TYPE={'ADD_TO_CART'}
      />

      <Image style={styles.img} source={{ uri: selectedBook.cover }} />

      <View style={styles.descriptionContainer}>
        <Text style={styles.titleYear}>
          {selectedBook.title} ({selectedBook.year})
        </Text>
        <View style={styles.titlesContainer}>
          <Text style={styles.titles}>Author:</Text>
          <Text style={styles.description}>{selectedBook.author}</Text>
        </View>
        <View style={styles.titlesContainer}>
          <Text style={styles.titles}>Publisher:</Text>
          <Text style={styles.description}>{selectedBook.publisher}</Text>
        </View>
        <View style={styles.titlesContainer}>
          <Text style={styles.titles}>ISBN:</Text>
          <Text style={styles.description}>{selectedBook.isbn}</Text>
        </View>
        <View style={styles.titlesContainer}>
          <Text style={styles.titles}>Price:</Text>
          <Text style={styles.description}>${selectedBook.cost}</Text>
        </View>
      </View>

      <Pressable style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Add To Cart</Text>
        <MaterialIcons name="keyboard-arrow-right" size={34} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '45%',
    marginBottom: 20,
    resizeMode: 'contain',
    marginTop: 10,
  },
  titleYear: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 25,
    color: '#877be3',
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  descriptionContainer: {
    alignItems: 'center',
  },
  titlesContainer: {
    flexDirection: 'row',
  },
  titles: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 17,
    color: '#51505c',
    lineHeight: 25,
    marginRight: 5,
  },
  description: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 17,
    color: '#877be3',
    lineHeight: 25,
    marginLeft: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
    backgroundColor: '#6200EE',
    paddingHorizontal: 35,
    paddingVertical: 13,
    borderRadius: 50,
  },
  btnText: {
    color: '#fff',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 17,
  },
});

export default Book;
