import { useContext } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from '../store/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CustomDrawerContent(props) {
  const { state, dispatch } = useContext(AppContext);
  const { currentLoggedUser } = state;

  const handlePress = () => {
    dispatch({ type: 'LOG_OUT' });

    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem('Account');
      } catch (e) {
        console.log(e);
      }
    };
    removeValue();

    props.navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageNameContainer}>
          <Image
            style={styles.img}
            source={{
              uri: currentLoggedUser.image,
            }}
          />
          <Text style={styles.name}>{currentLoggedUser.name}</Text>
        </View>
        <Pressable style={styles.btn}>
          <Text style={styles.btnTxt}>Edit Profile</Text>
        </Pressable>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Log Out"
          labelStyle={{ marginLeft: -20 }}
          icon={() => <AntDesign name="logout" size={24} color="#1c1c1ead" />}
          onPress={handlePress}
        />
      </DrawerContentScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    marginTop: 20,
    marginLeft: 20,
    paddingBottom: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  imageNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: 20,
  },
  name: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 15,
    color: '#877be3',
  },
  btn: {
    backgroundColor: '#6200EE',
    padding: 10,
    width: '50%',
    borderRadius: 100,
  },
  btnTxt: {
    fontFamily: 'Montserrat_500Medium',
    textAlign: 'center',
    color: 'white',
  },
});
export default CustomDrawerContent;
