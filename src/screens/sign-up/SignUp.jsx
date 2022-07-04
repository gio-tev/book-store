import { useState, useContext } from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import Toast from 'react-native-root-toast';

import { AppContext } from '../../store/AppContext';
import CustomStatusbar from '../../components/CustomStatusBar';
import SignUpStyles from './SignUpStyles';
import SignUpInputs from '../../components/SignUpInputs';
import Button from '../../components/UI/Button';
import { saveUser, signupUser } from '../../utils/https';
import { API_KEY } from '@env';
import { colors } from '../../utils/colors';

const styles = SignUpStyles;

const SignUp = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [emailExists, setEmailExists] = useState(false);
  const [clearInputs, SetClearInputs] = useState(false);
  const [emptyInputs, setEmptyInputs] = useState(false);
  const [signupError, setSignupError] = useState('');

  const showToast = text => {
    Toast.show(text, {
      position: Toast.positions.CENTER,
      position: 200,
      duration: 2000,
      hideOnPress: false,
      backgroundColor: colors.teal,
      opacity: 0.8,
    });
  };

  const handleSignInPress = () => {
    SetClearInputs(true);
    navigation.navigate('Sign In');
  };

  const handleRegisterPress = async () => {
    const sameUser = state.accounts.find(account => {
      return account.email === newUser.email;
    });

    if (sameUser) {
      return setEmailExists(true);
    }

    if (!state.networkAvailable) {
      return;
    }

    if (
      newUser.name.length === 0 ||
      newUser.email.length === 0 ||
      newUser.phone.length === 0 ||
      newUser.password.length === 0
    ) {
      setEmptyInputs(true);
    }

    if (
      newUser.name.length > 5 &&
      newUser.email.includes('@') &&
      newUser.email.length > 5 &&
      newUser.phone.length > 5 &&
      newUser.password.length > 5
    ) {
      const signupResponse = await signupUser(newUser.email, newUser.password, API_KEY);

      if (signupResponse.error) {
        return setSignupError(signupResponse.error.message);
      }

      const userWithoutPassword = {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      };

      const saveResponse = await saveUser(userWithoutPassword);

      dispatch({
        type: 'NEW_ACCOUNT',
        payload: {
          ...userWithoutPassword,
          id: saveResponse.name,
          image:
            'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=1000x750&vertical=top',
        },
      });

      SetClearInputs(true);

      setNewUser({
        name: '',
        email: '',
        phone: '',
        password: '',
      });

      showToast('Success!');

      navigation.replace('Sign In');
    }
  };

  return (
    <>
      <CustomStatusbar />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.signInUpContainer}>
          <Button text={styles.signInUpInactive} onPress={handleSignInPress}>
            SIGN IN
          </Button>

          <Button pressable={styles.signInUpActiveBtn} text={styles.signInUpActiveTxt}>
            SIGN UP
          </Button>
        </View>

        <KeyboardAvoidingView style={styles.avoidingView} behavior="position">
          <SignUpInputs
            setUser={setNewUser}
            clearInputs={clearInputs}
            SetClearInputs={SetClearInputs}
            emailExists={emailExists}
            setEmailExists={setEmailExists}
            emptyInputs={emptyInputs}
            setEmptyInputs={setEmptyInputs}
            signupError={signupError}
            setSignupError={setSignupError}
          />
        </KeyboardAvoidingView>
        <View style={styles.ContinueForgotContainer}>
          <Button
            pressable={({ pressed }) => [styles.continueBtn, pressed && styles.pressed]}
            text={styles.continueForgotActive}
            onPress={handleRegisterPress}
          >
            CONTINUE
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default SignUp;
