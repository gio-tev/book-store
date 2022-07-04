import { useState, useContext } from 'react';
import { View } from 'react-native';
import { API_KEY } from '@env';

import CustomStatusbar from '../../components/CustomStatusBar';
import SignInStyles from './SignInStyles';
import SignInInputs from '../../components/SignInInputs';
import { AppContext } from '../../store/AppContext';
import Button from '../../components/UI/Button';
import { authenticateUser } from '../../utils/https';
import asyncStorage from '../../utils/asyncStorage';

const styles = SignInStyles;

const SignIn = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });
  const [SignInError, setSignInError] = useState('');
  const [emptyInputs, setEmptyInputs] = useState(false);

  const handleSignUpPress = () => {
    setSignInError('');

    setSignIn({
      email: '',
      password: '',
    });

    navigation.navigate('Sign Up');
  };

  const handleContinuePress = async () => {
    if (!state.networkAvailable) {
      return;
    }

    if (signIn.email.length === 0 || signIn.password.length === 0) {
      return setEmptyInputs(true);
    }

    const auth = await authenticateUser(signIn.email, signIn.password, API_KEY);

    if (auth.error) {
      return setSignInError(auth.error.message);
    }

    if (auth.registered) {
      setSignInError('');

      const loggedAccount = state.accounts.find(account => account.email === auth.email);

      asyncStorage('setItem', 'Account', loggedAccount);

      dispatch({ type: 'LOGGED_USER', payload: loggedAccount });

      navigation.navigate('DrawerNavigation', { screen: 'Home' });

      setSignIn({
        email: '',
        password: '',
      });

      return;
    }
  };

  const handleForgotPress = () => {
    setSignIn({
      email: '',
      password: '',
    });

    setSignInError('');

    navigation.navigate('Forgot Password');
  };

  return (
    <>
      <CustomStatusbar />

      <View style={styles.container}>
        <View style={styles.signInUpContainer}>
          <Button pressable={styles.signInUpActiveBtn} text={styles.signInUpActiveTxt}>
            SIGN IN
          </Button>

          <Button text={styles.signInUpInactive} onPress={handleSignUpPress}>
            SIGN UP
          </Button>
        </View>

        <SignInInputs
          signIn={signIn}
          setSignIn={setSignIn}
          SignInError={SignInError}
          setSignInError={setSignInError}
          emptyInputs={emptyInputs}
          setEmptyInputs={setEmptyInputs}
        />

        <View style={styles.ContinueForgotContainer}>
          <Button
            pressable={({ pressed }) => [styles.continueBtn, pressed && styles.pressed]}
            text={styles.continueTxt}
            onPress={handleContinuePress}
          >
            CONTINUE
          </Button>

          <Button
            pressable={styles.forgotBtn}
            text={styles.forgotTxt}
            onPress={handleForgotPress}
          >
            FORGOT PASSWORD
          </Button>
        </View>
      </View>
    </>
  );
};

export default SignIn;
