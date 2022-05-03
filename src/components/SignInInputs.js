import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SignInInputs = () => {
  const [emailInputActive, setEmailInputActive] = useState(false);
  const [passwordInputActive, setPasswordInputActive] = useState(false);

  const handleEmailFocus = () => setEmailInputActive(true);
  const handleEmailBlur = () => setEmailInputActive(false);
  const handlePasswordFocus = () => setPasswordInputActive(true);
  const handlePasswordBlur = () => setPasswordInputActive(false);

  return (
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
});

export default SignInInputs;
