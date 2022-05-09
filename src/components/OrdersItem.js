import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const CartItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: item.cover }} />
      <View>
        <View style={styles.descriptionTitleContainer}>
          <Text style={styles.description}>Title:</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.descriptionTitleContainer}>
          <Text style={styles.description}>Author:</Text>
          <Text style={styles.title}>{item.author}</Text>
        </View>
        <View style={styles.descriptionTitleContainer}>
          <Text style={styles.description}>Year:</Text>
          <Text style={styles.title}>{item.year}</Text>
        </View>
        <View style={styles.descriptionTitleContainer}>
          <Text style={styles.description}>Price:</Text>
          <Text style={styles.title}>{item.cost}</Text>
        </View>
        <View style={styles.descriptionTitleContainer}>
          <Text style={styles.description}>Quantity:</Text>
          <Text style={styles.title}>{item.quantity}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  img: {
    width: '18%',
    height: 85,
    borderRadius: 10,
    marginRight: 10,
  },
  descriptionTitleContainer: {
    flexDirection: 'row',
  },
  description: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 13,
    marginRight: 5,
    color: '#6200EE',
    color: '#181818',
  },
  title: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 13,
    color: '#707070',
  },
});

export default CartItem;
