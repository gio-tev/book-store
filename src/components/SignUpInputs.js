import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/colors';

const SignUpInputs = ({ setUser, clearInputs, SetClearInputs, emailExists, setEmailExists }) => {
  const [nameValue, setNameValue] = useState('');
  const [nameInputActive, setNameInputActive] = useState(false);
  const [nameInputIsValid, setNameInputIsValid] = useState(true);

  const [emailValue, setEmailValue] = useState('');
  const [emailInputActive, setEmailInputActive] = useState(false);
  const [emailInputIsValid, setEmailInputIsValid] = useState(true);

  const [phoneValue, setPhoneValue] = useState('');
  const [phoneInputActive, setPhoneInputActive] = useState(false);
  const [phoneInputIsValid, setPhoneInputIsValid] = useState(true);

  const [passwordValue, setPasswordValue] = useState('');
  const [passwordInputActive, setPasswordInputActive] = useState(false);
  const [passwordInputIsValid, setPasswordInputIsValid] = useState(true);

  useEffect(() => {
    if (clearInputs) {
      setNameValue('');
      setEmailValue('');
      setPhoneValue('');
      setPasswordValue('');

      SetClearInputs(false);
    }
  }, [clearInputs]);

  const handleNameFocus = () => setNameInputActive(true);
  const handleNameBlur = () => setNameInputActive(false);
  const handleNameChange = name => {
    setNameValue(name);
    if (name.length > 2) {
      setNameInputIsValid(true);
      setUser(prevState => {
        return { ...prevState, name };
      });
    } else setNameInputIsValid(false);
  };

  const handleEmailFocus = () => setEmailInputActive(true);
  const handleEmailBlur = () => setEmailInputActive(false);
  const handleEmailChange = email => {
    setEmailExists(false);
    setEmailValue(email);

    if (email.length > 4) {
      setEmailInputIsValid(true);

      setUser(prevState => {
        return { ...prevState, email };
      });
    } else setEmailInputIsValid(false);
  };

  const handlePhoneFocus = () => setPhoneInputActive(true);
  const handlePhoneBlur = () => setPhoneInputActive(false);
  const handlePhoneChange = phone => {
    setPhoneValue(phone);

    if (phone.length > 4) {
      setPhoneInputIsValid(true);

      setUser(prevState => {
        return { ...prevState, phone };
      });
    } else setPhoneInputIsValid(false);
  };

  const handlePasswordFocus = () => setPasswordInputActive(true);
  const handlePasswordBlur = () => setPasswordInputActive(false);
  const handlePasswordChange = password => {
    setPasswordValue(password);

    if (password.length > 4) {
      setPasswordInputIsValid(true);

      setUser(prevState => {
        return { ...prevState, password };
      });
    } else setPasswordInputIsValid(false);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={handleNameChange}
        onFocus={handleNameFocus}
        onBlur={handleNameBlur}
        style={[styles.inputs, nameInputActive ? styles.inputActive : '']}
        placeholder="Name"
        value={nameValue}
      />
      {!nameInputIsValid && <Text style={styles.error}>Name must contain 3 or more letters.</Text>}
      <TextInput
        onChangeText={handleEmailChange}
        onFocus={handleEmailFocus}
        onBlur={handleEmailBlur}
        style={[styles.inputs, emailInputActive ? styles.inputActive : '']}
        placeholder="Email"
        value={emailValue}
      />
      {!emailInputIsValid && (
        <Text style={styles.error}>Email must contain 5 or more letters.</Text>
      )}
      <TextInput
        onChangeText={handlePhoneChange}
        onFocus={handlePhoneFocus}
        onBlur={handlePhoneBlur}
        style={[styles.inputs, phoneInputActive ? styles.inputActive : '']}
        placeholder="Phone"
        value={phoneValue}
      />
      {!phoneInputIsValid && (
        <Text style={styles.error}>Phone must contain 5 or more letters.</Text>
      )}
      <TextInput
        onChangeText={handlePasswordChange}
        onFocus={handlePasswordFocus}
        onBlur={handlePasswordBlur}
        style={[styles.inputs, passwordInputActive ? styles.inputActive : '']}
        placeholder="Password"
        value={passwordValue}
        secureTextEntry={true}
      />
      {!passwordInputIsValid && (
        <Text style={styles.error}>Password must contain 5 or more letters.</Text>
      )}

      {emailExists && <Text style={styles.error}>Email already exists.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    marginBottom: 40,
    alignSelf: 'center',
  },
  inputs: {
    height: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
  },
  inputActive: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  error: {
    fontFamily: 'Montserrat_500Medium',
    color: colors.redError,
    marginTop: 5,
    fontSize: 13,
  },
});

export default SignUpInputs;
