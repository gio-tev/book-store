import { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  ScrollView,
} from 'react-native';

import HomeItem from '../components/HomeItem';
import { colors } from '../utils/colors';
import { fetchBooks } from '../utils/https';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({ navigation }) => {
  const [booksData, setBooksData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const loadBooks = async () => {
      const books = await fetchBooks();

      if (books === 'Network request failed') {
        return setFetchError(true);
      }

      setBooksData(books);
      setFetchError(false);
      setIsLoading(false);
    };
    loadBooks();
  }, []);

  if (fetchError) {
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.error}>Something went wrong, try again later.</Text>
      </ScrollView>
    );
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
