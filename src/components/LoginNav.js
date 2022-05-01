import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';

const LoginNav = ({ navigation }) => {
  // console.log(navigation);
  const handlePress = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} style={styles.signInBtn}>
        <Text style={styles.btnTxt}>SIGN IN</Text>
      </Pressable>
      <Pressable style={styles.signUpBtn}>
        <Text style={styles.btnTxt}>SIGN UP</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    width: '75%',
    height: '23%',
  },
  signInBtn: {
    justifyContent: 'center',
    width: '100%',
    height: '42%',
    backgroundColor: '#9599B3',
    paddingLeft: '25%',
  },
  signUpBtn: {
    justifyContent: 'center',
    width: '100%',
    height: '58%',
    backgroundColor: '#6200EE',
    paddingLeft: '25%',
  },
  btnTxt: {
    fontFamily: 'Montserrat_500Medium',
    color: '#fff',
  },
});

export default LoginNav;
