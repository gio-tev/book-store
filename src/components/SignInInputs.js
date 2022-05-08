import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const SignInInputs = ({ signIn, setSignIn, SignInError }) => {
  const [emailInputActive, setEmailInputActive] = useState(false);
  const [passwordInputActive, setPasswordInputActive] = useState(false);

  const handleEmailFocus = () => setEmailInputActive(true);
  const handleEmailBlur = () => setEmailInputActive(false);
  const handleEmailChange = email => {
    // if (email.legth > 4)
    setSignIn(prevState => {
      return { ...prevState, email };
    });
  };

  const handlePasswordFocus = () => setPasswordInputActive(true);
  const handlePasswordBlur = () => setPasswordInputActive(false);
  const handlePasswordChange = password => {
    // if (password.legth > 4)
    setSignIn(prevState => {
      return { ...prevState, password };
    });
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={handleEmailChange}
        onFocus={handleEmailFocus}
        onBlur={handleEmailBlur}
        style={[styles.inputs, emailInputActive ? styles.inputActive : '']}
        placeholder="Email"
        value={signIn.email}
      />
      <TextInput
        onChangeText={handlePasswordChange}
        onFocus={handlePasswordFocus}
        onBlur={handlePasswordBlur}
        style={[styles.inputs, passwordInputActive ? styles.inputActive : '']}
        placeholder="Password"
        value={signIn.password}
      />
      {SignInError && (
        <Text style={styles.error}>
          Incorrect email address and/or password.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    marginBottom: 40,
  },
  inputs: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
    height: 50,
  },
  inputActive: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1.4,
  },
  error: {
    color: '#eb1e1e',
  },
});

export default SignInInputs;
