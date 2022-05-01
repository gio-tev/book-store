import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';

const Login = () => {
  const [SignInUpActive, setSignInUpActive] = useState(1);
  const [emailInputActive, setEmailInputActive] = useState(false);
  const [passwordInputActive, setPasswordInputActive] = useState(false);
  const [continueForgotActive, setContinueForgotActive] = useState(1);

  const handleSignInPress = () => setSignInUpActive(1);
  const handleSignUpPress = () => setSignInUpActive(2);

  const handleEmailFocus = () => setEmailInputActive(true);
  const handleEmailBlur = () => setEmailInputActive(false);
  const handlePasswordFocus = () => setPasswordInputActive(true);
  const handlePasswordBlur = () => setPasswordInputActive(false);

  const handleContinuePress = () => setContinueForgotActive(1);
  const handleForgotPress = () => setContinueForgotActive(2);

  return (
    <View style={styles.container}>
      <View style={styles.signInUpContainer}>
        <Pressable onPress={handleSignInPress}>
          <Text
            style={
              SignInUpActive === 1
                ? styles.signInUpActive
                : styles.signInUpInactive
            }
          >
            SIGN IN
          </Text>
        </Pressable>
        <Pressable onPress={handleSignUpPress}>
          <Text
            style={
              SignInUpActive === 2
                ? styles.signInUpActive
                : styles.signInUpInactive
            }
          >
            SIGN UP
          </Text>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
          style={[styles.inputs, emailInputActive ? styles.inputActive : '']}
          placeholder="Email"
        />
        <TextInput
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
          style={[styles.inputs, passwordInputActive ? styles.inputActive : '']}
          placeholder="Password"
        />
      </View>
      <View style={styles.ContinueForgotContainer}>
        <Pressable onPress={handleContinuePress} style={styles.continueBtn}>
          <Text
            style={
              continueForgotActive === 1
                ? styles.continueForgotActive
                : styles.continueForgotInactive
            }
          >
            CONTINUE
          </Text>
        </Pressable>
        <Pressable onPress={handleForgotPress}>
          <Text
            style={
              continueForgotActive === 2
                ? styles.continueForgotActive
                : styles.continueForgotInactive
            }
          >
            FORGOT PASSWORD
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 65,
  },
  signInUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginBottom: 25,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  signInUpActive: {
    fontFamily: 'Montserrat_500Medium',
    backgroundColor: '#6200EE',
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  signInUpInactive: {
    fontFamily: 'Montserrat_500Medium',
    // backgroundColor: '#6200EE',
    color: 'grey',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderRadius: 100,
  },

  inputContainer: {
    width: '90%',
    marginBottom: 50,
  },
  inputs: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
    height: 40,
    // textAlign: 'center',
    // outlineStyle: 'none',
  },
  inputActive: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1.4,
  },
  ContinueForgotContainer: {
    textAlign: 'center',
    width: '92%',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  continueBtn: {
    marginBottom: 5,
  },
  continueForgotActive: {
    backgroundColor: '#6200EE',
    padding: 20,
    borderRadius: 100,
    fontFamily: 'Montserrat_500Medium',
    color: '#fff',
    textAlign: 'center',
  },
  continueForgotInactive: {
    padding: 20,
    // borderRadius: 100,
    fontFamily: 'Montserrat_700Bold',
    color: '#6200EE',
    textAlign: 'center',
  },
});
