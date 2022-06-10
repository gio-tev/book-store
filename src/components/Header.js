import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({ headerTitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.menuTitleContainer}>
        <Text style={styles.title}>{headerTitle}</Text>
      </View>
      <View style={styles.rightIcons}>
        <Fontisto name="bell-alt" size={22} color="#dadae3" />
        <Ionicons name="md-share-social" size={25} color="#dadae3" />
        <MaterialIcons name="search" size={25} color="#dadae3" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 19,
    color: 'white',
    marginLeft: -15,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '40%',
  },
});

export default Header;
