import { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';

import { AppContext } from '../store/AppContext';
import HomeItem from '../components/HomeItem';
import { colors } from '../utils/colors';
import { fetchBooks } from '../utils/https';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({ navigation }) => {
  const { state } = useContext(AppContext);

  const [booksData, setBooksData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      const books = await fetchBooks();

      if (!state.networkAvailable) {
        return setFetchError(true);
      }

      setBooksData(books);
      setFetchError(false);
      setIsLoading(false);
    };
    loadBooks();
  }, [state.networkAvailable]);

  if (fetchError) {
    return <Text style={styles.error}>Something went wrong, try again later.</Text>;
  }

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.teal} style={styles.loading} />
      ) : (
        <View style={styles.booksContainer}>
          <FlatList
            numColumns={2}
            data={booksData}
            renderItem={({ item }) => <HomeItem item={item} navigation={navigation} />}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </>
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
  error: {
    fontFamily: 'Montserrat_500Medium',
    color: colors.redError,
    alignSelf: 'center',
    marginTop: 80,
  },
});

export default Home;
