import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import DATA from '../../api/book.json';
import BookDetailsItem from '../components/BookDetailsItem';

const BookDetails = () => {
  return (
    <View>
      <View style={styles.booksontainer}>
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
  booksontainer: {
    width: '95%',
    borderLeftColor: 'lightgrey',
    borderRightColor: 'lightgrey',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    alignSelf: 'center',
  },
});

export default BookDetails;
