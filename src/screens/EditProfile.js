import { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
} from 'react-native';
import { colors } from '../utils/colors';
import EditprofileInputs from '../components/EditprofileInputs';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/UI/Button';

const EditProfile = ({ route }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const icon = <Ionicons name="ios-cloud-upload-outline" size={22} color="white" />;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="position">
        <View style={styles.pictureNameContainer}>
          <Image source={{ uri: image ? image : route.params.user.image }} style={styles.img} />
          <View style={styles.titleIconContainer}>
            <Text style={styles.name}>{route.params.user.name}</Text>

            <Button
              pressable={({ pressed }) => [styles.btn, pressed && styles.pressed]}
              text={styles.btnTxt}
              onPress={pickImage}
              icon={icon}
            >
              Upload Image
            </Button>
          </View>
        </View>

        <EditprofileInputs picture={image} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    width: '100%',
  },
  pictureNameContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  titleIconContainer: {
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brown,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 100,
  },
  btnTxt: {
    fontFamily: 'Montserrat_500Medium',
    color: 'white',
    marginRight: 5,
  },

  name: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 20,
    color: colors.darkGrey,
    marginBottom: 20,
  },
  pressed: {
    opacity: 0.75,
  },
});
