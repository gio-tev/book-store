import React, { useState, useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import SignInStyles from './SignInStyles';
import SignInInputs from '../../components/SignInInputs';
import { AppContext } from '../../store/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = SignInStyles;

const SignIn = ({ navigation }) => {
  const appCtx = useContext(AppContext);

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

    appCtx.state.accounts.map(account => {
      if (
        account.email === signIn.email &&
        account.password === signIn.password
      ) {
        const storeData = async value => {
          try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('Account', jsonValue);
          } catch (e) {
            console.log(e);
          }
        };
        storeData(account);

        appCtx.dispatch({ type: 'LOGGED_USER', payload: account });

        setSignInError(false);

        navigation.navigate('DrawerNavigation', { screen: 'Home' });

        setSignIn({
          email: '',
          password: '',
        });
      } else if (
        (account.email !== signIn.email ||
          account.password !== signIn.password) &&
        !forgotBtnClicked
      ) {
        setSignInError(true);
      }
    });

    setForgotBtnClicked(false);
  };

  const handleForgotPress = () => {
    setContinueForgotActive(2);
    setForgotBtnClicked(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.signInUpContainer}>
        <Pressable>
          <Text style={styles.signInUpActive}>SIGN IN</Text>
        </Pressable>
        <Pressable onPress={handleSignUpPress}>
          <Text style={styles.signInUpInactive}>SIGN UP</Text>
        </Pressable>
      </View>

      <SignInInputs
        setSignIn={setSignIn}
        SignInError={SignInError}
        signIn={signIn}
      />

      <View style={styles.ContinueForgotContainer}>
        <Pressable onPress={handleContinuePress} style={styles.continueBtn}>
          <Text
            style={
              continueForgotActive === 1
                ? styles.continueForgotActive
                : styles.continueForgotInactive
            }
          >
            CONTINUE
          </Text>
        </Pressable>
        <Pressable onPress={handleForgotPress}>
          <Text
            style={
              continueForgotActive === 2
                ? styles.continueForgotActive
                : styles.continueForgotInactive
            }
          >
            FORGOT PASSWORD
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
