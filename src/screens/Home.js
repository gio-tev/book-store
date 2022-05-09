import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import DATA from '../../api/book.json';
import HomeItem from '../components/HomeItem';

const Home = ({ navigation }) => {
  return (
    <View>
      <View style={styles.booksontainer}>
        <FlatList
          numColumns={2}
          data={DATA}
          renderItem={({ item }) => (
            <HomeItem item={item} navigation={navigation} />
          )}
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

export default Home;
