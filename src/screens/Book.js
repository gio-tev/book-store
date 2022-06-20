import { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { AppContext } from '../store/AppContext';
import ModalComp from '../components/UI/Modal';
import { colors } from '../utils/colors';
import Button from '../components/UI/Button';

const Book = () => {
  const { state } = useContext(AppContext);
  const { selectedBook } = state;
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(!modalVisible);
  };

  const icon = <FontAwesome5 name="arrow-right" size={22} color="white" />;

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
        <Text style={styles.title}>{selectedBook.title}</Text>
        <View style={styles.titlesContainer}>
          <Text style={styles.titles}>Author:</Text>
          <Text style={styles.description}>{selectedBook.author}</Text>
        </View>
        <View style={styles.titlesContainer}>
          <Text style={styles.titles}>Year:</Text>
          <Text style={styles.description}>{selectedBook.year}</Text>
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

      <Button
        pressable={({ pressed }) => [styles.btn, pressed && styles.pressed]}
        text={styles.btnText}
        onPress={handlePress}
        icon={icon}
      >
        Add To Cart
      </Button>
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
  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 25,
    color: colors.darkGrey,
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
    color: colors.darkGrey,
    lineHeight: 25,
    marginRight: 5,
  },
  description: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 17,
    color: 'black',
    lineHeight: 25,
    marginLeft: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
    backgroundColor: colors.brown,
    paddingHorizontal: 35,
    paddingVertical: 13,
    borderRadius: 50,
  },
  btnText: {
    color: '#fff',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 17,
    marginRight: 10,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default Book;
