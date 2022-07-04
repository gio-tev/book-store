import { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

import { AppContext } from '../store/AppContext';
import { colors } from '../utils/colors';
import Button from './UI/Button';
import asyncStorage from '../utils/asyncStorage';

const EditprofileInputs = ({ picture }) => {
  const { state, dispatch } = useContext(AppContext);

  const route = useRoute();
  const navigation = useNavigation();

  const [userInputs, setUserInputs] = useState({
    ...route.params.user,
  });

  const [focusedInput, setFocusedInput] = useState({
    name: false,
    phone: false,
  });

  const showToast = text => {
    Toast.show(text, {
      position: Toast.positions.CENTER,
      position: 0,
      duration: 2000,
      hideOnPress: false,
      backgroundColor: colors.brown,
      opacity: 0.95,
    });
  };

  const handleInputs = (inputIdentifier, enteredValue) => {
    setUserInputs(prevState => {
      return {
        ...prevState,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const handleFocus = inputFocused => {
    setFocusedInput(prevState => {
      return { ...prevState, [inputFocused]: true };
    });
  };

  const handleBlur = inputBlurred => {
    setFocusedInput(prevState => {
      return { ...prevState, [inputBlurred]: false };
    });
  };

  const handleEditPress = () => {
    if (!state.networkAvailable) {
      return;
    }

    const updatedUser = {
      ...userInputs,
      image: picture ? picture : route.params.user.image,
    };

    const updateProfile = async () => {
      const modifiedProfile = {
        name: userInputs.name,
        email: userInputs.email,
        image: picture ? picture : route.params.user.image,
        phone: userInputs.phone,
      };

      await fetch(
        `https://book-store-ac9bf-default-rtdb.firebaseio.com/accounts/${userInputs.id}.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(modifiedProfile),
        }
      );
    };
    updateProfile();

    asyncStorage('setItem', 'Account', updatedUser);

    dispatch({ type: 'EDIT_PROFILE', payload: updatedUser });

    showToast('Your profile has been updated!');

    setTimeout(() => {
      navigation.replace('DrawerNavigation', { screen: 'Home' });
    }, 2000);
  };

  return (
    <View style={styles.inputsContainer}>
      <View
        style={[styles.inputContainer, focusedInput.name && styles.inputContainerActive]}
      >
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleInputs.bind(this, 'name')}
          onFocus={handleFocus.bind(this, 'name')}
          onBlur={handleBlur.bind(this, 'name')}
          value={userInputs.name}
        />
      </View>

      <View
        style={[styles.inputContainer, focusedInput.phone && styles.inputContainerActive]}
      >
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleInputs.bind(this, 'phone')}
          onFocus={handleFocus.bind(this, 'phone')}
          onBlur={handleBlur.bind(this, 'phone')}
          value={userInputs.phone}
        />
      </View>
      {!state.networkAvailable && (
        <Text style={styles.error}>No internet connection, try again later.</Text>
      )}
      <Button
        pressable={({ pressed }) => [styles.btn, pressed && styles.pressed]}
        text={styles.btnTxt}
        onPress={handleEditPress}
      >
        Save Changes
      </Button>
    </View>
  );
};

export default EditprofileInputs;

const styles = StyleSheet.create({
  inputsContainer: {
    width: '100%',
    marginTop: '10%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
  },
  inputContainerActive: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  label: {
    marginRight: 15,
    fontSize: 15,
    color: colors.darkGrey,
  },
  input: {
    width: '100%',
    height: 50,
    fontSize: 15,
    alignItems: 'center',
    color: 'black',
  },
  btn: {
    width: '90%',
    marginTop: '5%',
    backgroundColor: colors.teal,
    paddingVertical: 15,
    borderRadius: 100,
  },
  btnTxt: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
  pressed: {
    opacity: 0.75,
  },
  error: {
    fontFamily: 'Montserrat_500Medium',
    color: colors.redError,
    fontSize: 12,
  },
});
