import { View, StyleSheet, FlatList } from 'react-native';
import DATA from '../../api/book.json';
import HomeItem from '../components/HomeItem';

const Home = ({ navigation }) => {
  return (
    <View style={styles.booksContainer}>
      <FlatList
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
    width: '90%',
    alignSelf: 'center',
  },
});

export default Home;
