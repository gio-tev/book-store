import { useState, useContext } from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';

import { AppContext } from '../../store/AppContext';
import CustomStatusbar from '../../components/CustomStatusBar';
import SignUpStyles from './SignUpStyles';
import SignUpInputs from '../../components/SignUpInputs';
import Button from '../../components/UI/Button';

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

  const handlePress = async () => {
    let sameEmail = false;
    state.accounts.forEach(account => {
      if (account.email === newUser.email) {
        setEmailExists(true);
        sameEmail = true;
      }
    });

    if (sameEmail) return;

    if (
      newUser.name.length > 2 &&
      newUser.email.length > 4 &&
      newUser.phone.length > 4 &&
      newUser.password.length > 4
    ) {
      await fetch('https://book-store-ac9bf-default-rtdb.firebaseio.com/accounts.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newUser,
          image:
            'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=1000x750&vertical=top',
        }),
      });

      dispatch({
        type: 'NEW_ACCOUNT',
        payload: {
          ...newUser,
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

      navigation.navigate('Success');

      setTimeout(() => {
        navigation.navigate('Sign In');
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
            onPress={handlePress}
          >
            CONTINUE
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default SignUp;
