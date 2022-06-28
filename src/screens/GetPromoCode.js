import { useContext } from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

import { AppContext } from '../store/AppContext';
import { colors } from '../utils/colors';
import Button from '../components/UI/Button';

const GetPromoCode = () => {
  const { state, dispatch } = useContext(AppContext);
  const [currentStatus, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState('');

  const [promoError, setPromoError] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [codeGenerated, setCodeGenerated] = useState(false);

  const verifyPermissions = async () => {
    if (currentStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (currentStatus.status === PermissionStatus.DENIED) {
      return false;
    }

    return true;
  };

  const handleTakePicPress = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      setPermissionDenied(true);
      return;
    }
    setPromoError(false);

    const picture = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!picture.cancelled) {
      setImage(picture.uri);
    }
  };

  const handleGetPromoPress = async () => {
    try {
      if (image && codeGenerated) {
        return;
      }
      if (image && !codeGenerated) {
        Clipboard.setString(Math.random().toString().slice(2));

        const code = await Clipboard.getStringAsync();

        dispatch({ type: 'PROMO_CODE', payload: code });

        setCodeGenerated(true);
      }
      if (!image) {
        setPromoError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const icon = <Ionicons name="ios-copy-outline" size={24} color="grey" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
        <Text style={styles.title}>
          Send us a picture of a book bought in our store and get a 20% discount
        </Text>

        <View style={styles.promoContainer}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require('../../assets/placeholder-book.jpg')}
              style={styles.backgroundImage}
            >
              {!!image && <Image source={{ uri: image }} style={styles.image} />}
            </ImageBackground>
          </View>

          <Button
            pressable={({ pressed }) => [styles.promoBtn, pressed && styles.pressed]}
            text={styles.promoTxt}
            onPress={handleTakePicPress}
          >
            TAKE A PICTURE
          </Button>
          {permissionDenied && (
            <Text style={styles.error}>
              You did not grant an access to take pictures.
            </Text>
          )}

          <View style={styles.codeIconContainer}>
            <TextInput
              style={styles.promo}
              placeholder="Promo Code"
              editable={false}
              value={state.promoCode}
            />

            <Button
              pressable={({ pressed }) => [styles.copyBtn, pressed && styles.iconPressed]}
              text={styles.copyTxt}
              onPress={handleGetPromoPress}
              icon={icon}
            >
              Get Code
            </Button>
          </View>
          {promoError && (
            <Text style={styles.error}>
              You must have a picture of a book to proceed.
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default GetPromoCode;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  keyboardView: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat_500Medium',
    color: colors.darkGrey,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  promoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    marginVertical: 40,
    borderRadius: 5,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: 280,
    height: 280,
  },
  image: {
    width: 280,
    height: 300,
  },
  codeIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
    marginTop: 40,
    paddingBottom: 5,
    width: '75%',
  },
  promo: {
    color: 'grey',
  },
  promoActive: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  promoBtn: {
    backgroundColor: colors.teal,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 100,
    marginTop: 10,
  },
  promoTxt: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 11,
    color: '#fff',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyTxt: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 12,
    color: 'grey',
    marginRight: 5,
  },
  pressed: {
    opacity: 0.75,
  },
  iconPressed: {
    transform: [{ scale: 1.1 }],
    opacity: 0.5,
  },
  error: {
    fontFamily: 'Montserrat_500Medium',
    color: colors.redError,
    marginTop: 15,
    fontSize: 12,
  },
});
