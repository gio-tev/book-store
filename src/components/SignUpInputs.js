import { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from 'react-native';

const SignUpInputs = ({ setUser, clearInputs, SetClearInputs }) => {
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

  const [imageValue, setImageValue] = useState('');
  const [imageInputActive, setImageInputActive] = useState(false);
  const [imageInputIsValid, setImageInputIsValid] = useState(true);

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

  const handleImageFocus = () => setImageInputActive(true);
  const handleImageBlur = () => setImageInputActive(false);
  const handleImageChange = image => {
    setImageValue(image);

    if (image.length > 4) {
      setImageInputIsValid(true);

      setUser(prevState => {
        return { ...prevState, image };
      });
    } else setImageInputIsValid(false);
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
      {!nameInputIsValid && (
        <Text style={styles.error}>Name must contain 3 or more letters.</Text>
      )}
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
      />
      {!passwordInputIsValid && (
        <Text style={styles.error}>
          Password must contain 5 or more letters.
        </Text>
      )}
      <TextInput
        onChangeText={handleImageChange}
        onFocus={handleImageFocus}
        onBlur={handleImageBlur}
        style={[styles.inputs, imageInputActive ? styles.inputActive : '']}
        placeholder="Image URL"
        value={imageValue}
      />
      {!imageInputIsValid && (
        <Text style={styles.error}>Image must contain valid URL.</Text>
      )}
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
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
    height: 50,
  },
  inputActive: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  error: {
    color: '#eb1e1e',
  },
});

export default SignUpInputs;
