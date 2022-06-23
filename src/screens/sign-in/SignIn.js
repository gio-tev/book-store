import { useState, useContext } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomStatusbar from '../../components/CustomStatusBar';
import SignInStyles from './SignInStyles';
import SignInInputs from '../../components/SignInInputs';
import { AppContext } from '../../store/AppContext';
import Button from '../../components/UI/Button';
import { authenticateUser } from '../../utils/https';
import { API_KEY } from '@env';

const styles = SignInStyles;

const SignIn = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);

  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });

  const [SignInError, setSignInError] = useState(false);

  const handleSignUpPress = () => navigation.navigate('Sign Up');

  const handleContinuePress = async () => {
    const auth = await authenticateUser(signIn.email, signIn.password, API_KEY);
    console.log(auth, 'authhh');
    if (auth.registered) {
      setSignInError(false);

      const loggedAccount = state.accounts.find(account => account.email === auth.email);

      const storeData = async value => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('Account', jsonValue);
        } catch (e) {
          console.log(e);
        }
      };
      storeData(loggedAccount);

      dispatch({ type: 'LOGGED_USER', payload: loggedAccount });

      navigation.navigate('DrawerNavigation', { screen: 'Home' });

      setSignIn({
        email: '',
        password: '',
      });
      return;
    } else {
      setSignInError(true);
    }
  };

  const handleForgotPress = () => {
    setSignIn({
      email: '',
      password: '',
    });
    setSignInError(false);
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

        <SignInInputs setSignIn={setSignIn} SignInError={SignInError} signIn={signIn} />

        <View style={styles.ContinueForgotContainer}>
          <Button
            pressable={({ pressed }) => [styles.continueBtn, pressed && styles.pressed]}
            text={styles.continueTxt}
            onPress={handleContinuePress}
          >
            CONTINUE
          </Button>

          <Button pressable={styles.forgotBtn} text={styles.forgotTxt} onPress={handleForgotPress}>
            FORGOT PASSWORD
          </Button>
        </View>
      </View>
    </>
  );
};

export default SignIn;
