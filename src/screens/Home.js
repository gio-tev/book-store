import React from 'react';
import { View, StyleSheet, Image, Text, FlatList } from 'react-native';
import DATA from '../../api/book.json';
import HomeItem from '../components/HomeItem';
// import Header from '../components/Header';

const Home = ({ navigation }) => {
  return (
    <View>
      {/* <Header headerTitle={'Home'} /> */}

      <View style={styles.booksontainer}>
        <FlatList
          numColumns={2}
          // horizontal
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
    // borderRadius: 10,
    alignSelf: 'center',
    // paddingBottom: 20,
  },
});

export default Home;
