import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import HomeItem from '../components/HomeItem';
import { colors } from '../utils/colors';

const Home = ({ navigation }) => {
  const [booksData, setBooksData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    };
    fetchBooks();
  }, []);

  return (
    <View style={styles.booksContainer}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={colors.teal}
          style={styles.loading}
        />
      )}
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
  loading: {
    marginTop: 100,
  },
});

export default Home;
