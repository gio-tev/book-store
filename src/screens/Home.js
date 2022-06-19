import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import HomeItem from '../components/HomeItem';

const Home = ({ navigation }) => {
  const [booksData, setBooksData] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        'https://book-store-ac9bf-default-rtdb.firebaseio.com/books.json'
      );

      const data = await response.json();

      const transformedBooks = [];
      for (const [key, value] of Object.entries(data)) {
        const transforemdBook = {
          ...value,
          id: key,
        };
        transformedBooks.push(transforemdBook);
      }

      setBooksData(transformedBooks);
    };
    fetchBooks();
  }, []);

  return (
    <View style={styles.booksContainer}>
      <FlatList
        numColumns={2}
        data={booksData}
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
