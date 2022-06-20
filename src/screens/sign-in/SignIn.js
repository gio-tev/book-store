import { useState, useContext } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomStatusbar from '../../components/CustomStatusBar';
import SignInStyles from './SignInStyles';
import SignInInputs from '../../components/SignInInputs';
import { AppContext } from '../../store/AppContext';
import Button from '../../components/UI/Button';

const styles = SignInStyles;

const SignIn = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);

  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });
  const [SignInError, setSignInError] = useState(false);
  const [continueForgotActive, setContinueForgotActive] = useState(1);
  const [forgotBtnClicked, setForgotBtnClicked] = useState(false);

  const handleSignUpPress = () => navigation.navigate('Sign Up');

  const handleContinuePress = () => {
    setContinueForgotActive(1);

    setForgotBtnClicked(false);

    let accountMatched = false;

    state.accounts.forEach(account => {
      if (account.email === signIn.email && account.password === signIn.password) {
        setSignInError(false);
        accountMatched = true;
        const storeData = async value => {
          try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('Account', jsonValue);
          } catch (e) {
            console.log(e);
          }
        };
        storeData(account);

        dispatch({ type: 'LOGGED_USER', payload: account });

        navigation.navigate('DrawerNavigation', { screen: 'Home' });

        setSignIn({
          email: '',
          password: '',
        });
      }
    });

    if (accountMatched) return;

    state.accounts.forEach(account => {
      if (
        (account.email !== signIn.email || account.password !== signIn.password) &&
        !forgotBtnClicked
      ) {
        setSignInError(true);
      }
    });
  };

  const handleForgotPress = () => {
    setContinueForgotActive(2);
    setForgotBtnClicked(true);
    setSignInError(false);
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
            pressable={({ pressed }) =>
              continueForgotActive === 1
                ? [styles.continueBtnActive, pressed && styles.pressed]
                : styles.continueBtnInactive
            }
            text={
              continueForgotActive === 1
                ? styles.continueForgotActive
                : styles.continueForgotInactive
            }
            onPress={handleContinuePress}
          >
            CONTINUE
          </Button>

          <Button
            pressable={({ pressed }) =>
              continueForgotActive === 2
                ? [styles.continueBtnActive, pressed && styles.pressed]
                : styles.continueBtnInactive
            }
            text={
              continueForgotActive === 2
                ? styles.continueForgotActive
                : styles.continueForgotInactive
            }
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
