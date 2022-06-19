import { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors } from '../utils/colors';
import { AppContext } from '../store/AppContext';

const EditprofileInputs = ({ picture }) => {
  const { dispatch } = useContext(AppContext);

  const route = useRoute();
  const navigation = useNavigation();

  const [userInputs, setUserInputs] = useState({
    ...route.params.user,
  });

  const [focusedInput, setFocusedInput] = useState({
    email: false,
    password: false,
    phone: false,
  });

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
    const updatedUser = {
      ...userInputs,
      image: picture ? picture : route.params.user.image,
    };

    const updateProfile = async () => {
      const modifiedProfile = {
        name: userInputs.name,
        email: userInputs.email,
        password: userInputs.password,
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

    const storeData = async value => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('Account', jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
    storeData(updatedUser);

    dispatch({ type: 'EDIT_PROFILE', payload: updatedUser });

    navigation.replace('Success');

    setTimeout(() => {
      navigation.replace('DrawerNavigation', { screen: 'Home' });
    }, 1000);
  };

  return (
    <View style={styles.inputsContainer}>
      <View
        style={[
          styles.inputContainer,
          focusedInput.email && styles.inputContainerActive,
        ]}
      >
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleInputs.bind(this, 'email')}
          onFocus={handleFocus.bind(this, 'email')}
          onBlur={handleBlur.bind(this, 'email')}
          value={userInputs.email}
        />
      </View>

      <View
        style={[
          styles.inputContainer,
          focusedInput.password && styles.inputContainerActive,
        ]}
      >
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleInputs.bind(this, 'password')}
          onFocus={handleFocus.bind(this, 'password')}
          onBlur={handleBlur.bind(this, 'password')}
          value={userInputs.password}
          secureTextEntry={true}
        />
      </View>

      <View
        style={[
          styles.inputContainer,
          focusedInput.phone && styles.inputContainerActive,
        ]}
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

      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
        onPress={handleEditPress}
      >
        <Text style={styles.btnTxt}>Save Changes</Text>
      </Pressable>
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
    backgroundColor: colors.teal,
    paddingHorizontal: '20%',
    paddingVertical: 15,
    borderRadius: 100,
    marginTop: '5%',
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
});
