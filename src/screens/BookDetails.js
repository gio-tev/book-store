import React from 'react';
import { View, StyleSheet, Image, Text, FlatList } from 'react-native';
import DATA from '../../api/book.json';
import BookDetailsItem from '../components/BookDetailsItem';
// import Header from '../components/Header';

const BookDetails = () => {
  return (
    <View>
      <View style={styles.booksontainer}>
        <FlatList
          // numColumns={1}
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
    // borderRadius: 10,
    alignSelf: 'center',
    // paddingBottom: 20,
  },
});

export default BookDetails;
