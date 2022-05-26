import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LoginNav from '../components/LoginNav';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../../assets/cover.jpg')} />
      <View style={styles.text1Container}>
        <Text style={styles.text1}>Welcome</Text>
        <Text style={styles.text1}>to Book Store</Text>
      </View>
      <Text style={styles.text2}>Let's get started!</Text>

      <LoginNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  img: {
    height: '40%',
    width: '100%',
  },
  text1Container: {
    marginTop: '10%',
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    color: '#6200EE',
    fontSize: 30,
  },
  text2: {
    textAlign: 'center',
    fontFamily: 'Montserrat_500Medium',
    textAlign: 'center',
    color: '#6200EE',
    marginTop: '8%',
    fontSize: 17,
  },
});

export default Welcome;
