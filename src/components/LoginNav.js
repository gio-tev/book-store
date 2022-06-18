import { View, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/colors';

const LoginNav = ({ navigation }) => {
  const handleSignInPress = () => {
    navigation.navigate('Sign In');
  };
  const handleSignUpPress = () => {
    navigation.navigate('Sign Up');
  };

  return (
    <View style={styles.loginNaveContainer}>
      <Pressable
        onPress={handleSignInPress}
        style={({ pressed }) => [styles.signInBtn, pressed && styles.pressed]}
      >
        <Text style={styles.btnTxt}>SIGN IN</Text>
      </Pressable>

      <Pressable
        onPress={handleSignUpPress}
        style={({ pressed }) => [styles.signUpBtn, pressed && styles.pressed]}
      >
        <Text style={styles.btnTxt}>SIGN UP</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  loginNaveContainer: {
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
    borderTopLeftRadius: 3,
    backgroundColor: colors.brown,
    paddingLeft: '25%',
  },
  signUpBtn: {
    justifyContent: 'center',
    width: '100%',
    height: '58%',
    backgroundColor: colors.teal,
    paddingLeft: '25%',
  },
  btnTxt: {
    fontFamily: 'Montserrat_500Medium',
    color: '#fff',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default LoginNav;
