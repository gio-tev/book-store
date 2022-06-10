import { useState } from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import ModalComp from './Modal';
import { colors } from '../utils/colors';

const HomeItem = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleMorePress = () => {};
  const handleAddPress = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <ModalComp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
        title={'Are you sure you want to add item in cart ?'}
        TYPE={'ADD_TO_CART'}
      />

      <Image source={{ uri: item.cover }} style={styles.img} />

      <View style={styles.titlesBtnsContainer}>
        <View>
          <Text style={styles.name}>{item.title}</Text>
        </View>

        <View>
          <View style={styles.descriptionTitle}>
            <Text style={styles.description}>Author:</Text>
            <Text style={styles.title}>{item.author}</Text>
          </View>

          <View style={styles.descriptionTitle}>
            <Text style={styles.description}>Year:</Text>
            <Text style={styles.title}>{item.year}</Text>
          </View>

          <View style={styles.descriptionTitle}>
            <Text style={styles.description}>Price:</Text>
            <Text style={styles.title}>${item.cost}</Text>
          </View>
        </View>

        <View style={styles.btnsContainer}>
          <Pressable style={styles.btn} onPress={handleMorePress}>
            <Text style={styles.btnTxt}>More</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={handleAddPress}>
            <Ionicons name="add" size={24} color="#FFF" style={styles.icon} />
            <Text style={styles.btnTxt}>Add To Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
    flexDirection: 'row',
    marginBottom: 5,
  },

  img: {
    width: '35%',
    height: 180,
    borderRadius: 5,
    marginRight: '2%',
  },
  titlesBtnsContainer: {
    justifyContent: 'space-between',
    width: '63%',
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },

  descriptionTitle: {
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color: colors.darkGrey,
  },
  title: {
    fontFamily: 'Montserrat_500Medium',
    color: colors.darkGrey,
    fontSize: 15,
    lineHeight: 22,
  },
  description: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 15,
    color: colors.darkGrey,
    lineHeight: 22,
    marginRight: 5,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.teal,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 100,
  },
  btnTxt: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 11,
    color: '#fff',
  },
  icon: {
    marginLeft: -5,
  },
});

export default HomeItem;
