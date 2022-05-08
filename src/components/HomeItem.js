import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import { AppContext } from '../store/AppContext';

const HomeItem = ({ item, navigation }) => {
  const { dispatch } = useContext(AppContext);

  const handlePress = () => {
    dispatch({ type: 'SELECTED_BOOK', payload: item });
    navigation.navigate('Book');
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image source={{ uri: item.cover }} style={styles.img} />
      <View style={styles.titlesContainer}>
        {/* <Text style={styles.title}>{item.title}</Text> */}
        <Text style={styles.title}>By:</Text>
        <Text style={styles.author}>{item.author}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    // height: 300,
    paddingVertical: 5,
    // justifyContent: 'center',
  },
  titlesContainer: {
    borderBottomColor: '#C8C8C8',
    borderBottomWidth: 1,
    width: '80%',
    // // height: 100,
    alignSelf: 'center',
    paddingVertical: 5,
    flexDirection: 'row',
  },
  img: {
    width: '80%',
    alignSelf: 'center',
    height: 200,
    // marginBottom: 5,
  },
  title: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 15,
    color: 'grey',
    marginRight: 5,
  },
  author: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 15,
    color: '#877be3',
  },
});

export default HomeItem;
