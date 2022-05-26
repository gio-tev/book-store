import { useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import DATA from '../../api/book.json';
import HomeItem from '../components/HomeItem';

const Home = ({ navigation }) => {
  const homeRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      homeRef.current.scrollToIndex({ animated: true, index: 0 });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.booksContainer}>
      <FlatList
        ref={homeRef}
        numColumns={2}
        data={DATA}
        renderItem={({ item }) => (
          <HomeItem item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  booksContainer: {
    width: '95%',
    alignSelf: 'center',
  },
});

export default Home;
