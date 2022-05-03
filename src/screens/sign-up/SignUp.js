import React, { useState, useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import SignUpStyles from './SignUpStyles';
import SignUpInputs from '../../components/SignUpInputs';
import { AppContext } from '../../store/AppContext';

// import { useForm, Controller } from 'react-hook-form';

const styles = SignUpStyles;

const SignUp = ({ navigation }) => {
  const appCtx = useContext(AppContext);

  const [newUser, setNewUser] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Password: '',
  });
  const [clearInputs, SetClearInputs] = useState(false);

  const handleSignInPress = () => navigation.navigate('Sign In');

  const handlePress = () => {
    if (
      newUser.Name.length > 2 &&
      newUser.Email.length > 4 &&
      newUser.Phone.length > 4 &&
      newUser.Password.length > 4
    ) {
      appCtx.dispatch({ type: 'NEW_ACCOUNT', payload: newUser });

      SetClearInputs(true);

      setNewUser({
        Name: '',
        Email: '',
        Phone: '',
        Password: '',
      });

      navigation.navigate('Success');

      setTimeout(() => {
        navigation.navigate('Sign In');
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.signInUpContainer}>
        <Pressable onPress={handleSignInPress}>
          <Text style={styles.signInUpInactive}>SIGN IN</Text>
        </Pressable>

        <Pressable>
          <Text style={styles.signInUpActive}>SIGN UP</Text>
        </Pressable>
      </View>

      <SignUpInputs
        setUser={setNewUser}
        clearInputs={clearInputs}
        SetClearInputs={SetClearInputs}
      />

      <View style={styles.ContinueForgotContainer}>
        <Pressable onPress={handlePress} style={styles.continueBtn}>
          <Text style={styles.continueForgotActive}>CONTINUE</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;
