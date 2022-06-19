import { useState, useContext } from 'react';
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import CustomStatusbar from '../../components/CustomStatusBar';
import SignUpStyles from './SignUpStyles';
import SignUpInputs from '../../components/SignUpInputs';
import { AppContext } from '../../store/AppContext';

const styles = SignUpStyles;

const SignUp = ({ navigation }) => {
  const appCtx = useContext(AppContext);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [clearInputs, SetClearInputs] = useState(false);

  const handleSignInPress = () => navigation.navigate('Sign In');

  const handlePress = async () => {
    if (
      newUser.name.length > 2 &&
      newUser.email.length > 4 &&
      newUser.phone.length > 4 &&
      newUser.password.length > 4
    ) {
      await fetch(
        'https://book-store-ac9bf-default-rtdb.firebaseio.com/accounts.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...newUser,
            image:
              'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=1000x750&vertical=top',
          }),
        }
      );

      appCtx.dispatch({
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
          <Pressable onPress={handleSignInPress}>
            <Text style={styles.signInUpInactive}>SIGN IN</Text>
          </Pressable>

          <Pressable style={styles.signInUpActiveBtn}>
            <Text style={styles.signInUpActiveTxt}>SIGN UP</Text>
          </Pressable>
        </View>

        <KeyboardAvoidingView style={styles.avoidingView} behavior="position">
          <SignUpInputs
            setUser={setNewUser}
            clearInputs={clearInputs}
            SetClearInputs={SetClearInputs}
          />
        </KeyboardAvoidingView>
        <View style={styles.ContinueForgotContainer}>
          <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
              styles.continueBtn,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.continueForgotActive}>CONTINUE</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default SignUp;
