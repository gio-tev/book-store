import { useContext } from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { AppContext } from '../store/AppContext';
import { colors } from '../utils/colors';
import CustomStatusbar from '../components/CustomStatusBar';
import Button from '../components/UI/Button';
import { resetPassword } from '../utils/https';
import { API_KEY } from '@env';

const ForgotPassword = ({ navigation }) => {
  const { state } = useContext(AppContext);

  const [emailInput, setEmailInput] = useState('');
  const [emailInputActive, setEmailInputActive] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleEmailFocus = () => setEmailInputActive(true);
  const handleEmailBlur = () => setEmailInputActive(false);
  const handleEmailChange = email => {
    setEmailError(false);
    setEmailInput(email);
  };

  const handleResetPress = async () => {
    const emailFound = state.accounts.find(account => account.email === emailInput);

    if (!emailFound) setEmailError(true);

    const res = await resetPassword(emailInput, API_KEY);

    if (res.email)
      navigation.replace('Success', { text: 'Please check you Email to reset password!' });

    setTimeout(() => {
      navigation.goBack();
    }, 3000);
  };

  return (
    <>
      <CustomStatusbar />

      <View style={styles.container}>
        <Text style={styles.title}>Please enter your email</Text>

        <View style={styles.inputsContainer}>
          <TextInput
            onChangeText={handleEmailChange}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            style={[styles.inputs, emailInputActive ? styles.inputActive : '']}
            placeholder="Email"
            value={emailInput}
          />
          {emailError && <Text style={styles.error}>Incorrect email address.</Text>}
          <Button
            pressable={({ pressed }) => [styles.resetBtn, pressed && styles.pressed]}
            text={styles.resetTxt}
            onPress={handleResetPress}
          >
            RESET PASSWORD
          </Button>
        </View>
      </View>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 80,
  },
  title: {
    fontFamily: 'Montserrat_500Medium',
    // fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
    color: colors.darkGrey,
    marginBottom: 10,
  },
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
  resetBtn: {
    backgroundColor: colors.brown,
    marginTop: 40,
    marginBottom: 5,
    padding: 15,
    borderRadius: 100,
  },
  resetTxt: {
    fontFamily: 'Montserrat_500Medium',
    color: '#fff',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  error: {
    fontFamily: 'Montserrat_500Medium',
    color: colors.redError,
    marginTop: 15,
    fontSize: 12,
  },
});
