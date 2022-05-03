import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import SignInStyles from './SignInStyles';
import SignInInputs from '../../components/SignInInputs';

const styles = SignInStyles;

const SignIn = ({ navigation }) => {
  const [continueForgotActive, setContinueForgotActive] = useState(1);

  const handleSignUpPress = () => navigation.navigate('Sign Up');

  const handleContinuePress = () => setContinueForgotActive(1);
  const handleForgotPress = () => setContinueForgotActive(2);

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

      <SignInInputs />

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
