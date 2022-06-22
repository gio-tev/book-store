import { useState, useContext } from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';

import { AppContext } from '../../store/AppContext';
import CustomStatusbar from '../../components/CustomStatusBar';
import SignUpStyles from './SignUpStyles';
import SignUpInputs from '../../components/SignUpInputs';
import Button from '../../components/UI/Button';
import { saveUser, signupUser } from '../../utils/https';

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

  const handleSignInPress = () => navigation.navigate('Sign In');

  const handleRegisterPress = async () => {
    const sameUser = state.accounts.find(account => {
      return account.email === newUser.email;
    });

    if (sameUser) {
      setEmailExists(true);
      return;
    }

    if (
      newUser.name.length > 5 &&
      newUser.email.includes('@') &&
      newUser.email.length > 5 &&
      newUser.phone.length > 5 &&
      newUser.password.length > 5
    ) {
      await signupUser(newUser.email, newUser.password);

      const userWithoutPassword = {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      };

      const res = await saveUser(userWithoutPassword);

      dispatch({
        type: 'NEW_ACCOUNT',
        payload: {
          ...userWithoutPassword,
          id: res.name,
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

      navigation.navigate('Success', { text: 'Success!' });

      setTimeout(() => {
        navigation.replace('Sign In');
      }, 2000);
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
