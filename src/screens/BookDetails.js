import { useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import DATA from '../../api/book.json';
import BookDetailsItem from '../components/BookDetailsItem';

const BookDetails = ({ navigation }) => {
  const detailsRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      detailsRef.current.scrollToIndex({ animated: true, index: 0 });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <View style={styles.booksContainer}>
        <FlatList
          ref={detailsRef}
          data={DATA}
          renderItem={({ item }) => <BookDetailsItem item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  booksContainer: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default BookDetails;
