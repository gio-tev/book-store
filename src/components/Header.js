import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
// import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({ headerTitle }) => {
  const handlePress = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.menuTitleContainer}>
        {/* <Pressable onPress={handlePress}>
          <Feather name="menu" size={30} color="white" />
        </Pressable> */}
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
    // paddingHorizontal: 20,
    // backgroundColor: '#6200EE',
    // height: 55,
    // zIndex: -1,
    // marginLeft: 50,
  },
  menuTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: '40%',
  },
  title: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 19,
    color: 'white',
    marginLeft: -15,
  },
  rightIcons: {
    // borderColor: 'red',
    // borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '40%',
    // marginRight: 5,
  },
});

export default Header;
