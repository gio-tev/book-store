import { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { AppContext } from '../store/AppContext';
import { colors } from '../utils/colors';

const SignInInputs = ({
  signIn,
  setSignIn,
  SignInError,
  setSignInError,
  emptyInputs,
  setEmptyInputs,
}) => {
  const { state } = useContext(AppContext);

  const [emailInputActive, setEmailInputActive] = useState(false);
  const [passwordInputActive, setPasswordInputActive] = useState(false);

  const handleEmailFocus = () => setEmailInputActive(true);
  const handleEmailBlur = () => setEmailInputActive(false);
  const handleEmailChange = email => {
    setSignInError('');
    setEmptyInputs(false);
    setSignIn(prevState => {
      return { ...prevState, email };
    });
  };

  const handlePasswordFocus = () => setPasswordInputActive(true);
  const handlePasswordBlur = () => setPasswordInputActive(false);
  const handlePasswordChange = password => {
    setSignInError('');
    setEmptyInputs(false);
    setSignIn(prevState => {
      return { ...prevState, password };
    });
  };

  return (
    <View style={styles.inputsContainer}>
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
        secureTextEntry={true}
      />
      {!!SignInError && <Text style={styles.error}>{SignInError}</Text>}

      {!state.networkAvailable && (
        <Text style={styles.error}>No internet connection, try again later.</Text>
      )}
      {emptyInputs && <Text style={styles.error}>Please fill out all the inputs.</Text>}
    </View>
  );
};

export default SignInInputs;

const styles = StyleSheet.create({
  inputsContainer: {
    width: '90%',
    marginBottom: 40,
  },

  inputs: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
    height: 50,
  },
  inputActive: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  error: {
    fontFamily: 'Montserrat_500Medium',
    color: colors.redError,
    marginTop: 15,
    fontSize: 12,
  },
});
