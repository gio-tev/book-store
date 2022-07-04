import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';

import { colors } from '../utils/colors';
import CustomStatusbar from '../components/CustomStatusBar';
import Button from '../components/UI/Button';
import { resetPassword } from '../utils/https';
import { API_KEY } from '@env';

const ForgotPassword = ({ navigation }) => {
  const [emailInput, setEmailInput] = useState('');
  const [emailInputActive, setEmailInputActive] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleEmailFocus = () => setEmailInputActive(true);
  const handleEmailBlur = () => setEmailInputActive(false);
  const handleEmailChange = email => {
    setEmailError('');
    setEmailInput(email);
  };

  const showToast = text => {
    Toast.show(text, {
      position: 100,
      duration: 2000,
      hideOnPress: false,
      backgroundColor: colors.teal,
      opacity: 0.95,
    });
  };

  const handleResetPress = async () => {
    const response = await resetPassword(emailInput, API_KEY);

    if (response.error) return setEmailError(response.error.message);

    showToast('Please check you Email to reset password!');

    setTimeout(() => {
      navigation.goBack();
    }, 2000);
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
          {!!emailError && <Text style={styles.error}>{emailError}</Text>}
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
