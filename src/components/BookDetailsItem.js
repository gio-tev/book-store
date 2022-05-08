import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import { AppContext } from '../store/AppContext';

const HomeItem = ({ item, navigation }) => {
  const { dispatch } = useContext(AppContext);

  const handleMorePress = () => {};
  const handleAddPress = () => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.cover }} style={styles.img} />

      <View style={styles.titlesBtnsContainer}>
        <View>
          <Text style={styles.name}>{item.title}</Text>
        </View>

        <View style={styles.descriptionTitleContainer}>
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
            <Text style={styles.title}>{item.cost}</Text>
          </View>
        </View>

        <View style={styles.btnsContainer}>
          <Pressable style={styles.btn} onPress={handleMorePress}>
            <Text style={styles.btnTxt}>More</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={handleAddPress}>
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
    // alignSelf: 'center',
    height: 200,
  },
  titlesBtnsContainer: {
    width: '65%',
    padding: 10,
    backgroundColor: '#E8E8E8',
    justifyContent: 'space-between',
  },
  descriptionTitleContainer: {
    marginTop: -30,
  },
  descriptionTitle: {
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color: '#877be3',
    marginTop: 5,
  },
  title: {
    fontFamily: 'Montserrat_500Medium',
    color: 'grey',
    fontSize: 15,
    lineHeight: 22,
  },
  description: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 15,
    color: '#51505c',
    lineHeight: 22,
    marginRight: 5,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 20,
    // position: 'absolute',
    // bottom: 15,
    // left: 15,
  },
  btn: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 100,
  },
  btnTxt: {
    fontFamily: 'Montserrat_700Bold',
    // fontFamily: 'Montserrat_500Medium',
    fontSize: 14,
    color: '#fff',
  },
});

export default HomeItem;
