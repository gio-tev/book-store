import { View, StyleSheet, FlatList } from 'react-native';
import DATA from '../../api/book.json';
import BookDetailsItem from '../components/BookDetailsItem';

const BookDetails = () => {
  return (
    <View>
      <View style={styles.booksContainer}>
        <FlatList
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
