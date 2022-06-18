import { useContext } from 'react';
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    paddingVertical: 5,
  },
  img: {
    width: '85%',
    alignSelf: 'center',
    height: 200,
    borderRadius: 5,
  },
});

export default HomeItem;
