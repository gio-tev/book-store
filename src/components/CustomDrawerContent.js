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
import { colors } from '../utils/colors';

function CustomDrawerContent(props) {
  const { state, dispatch } = useContext(AppContext);
  const { currentLoggedUser } = state;

  const handleLogoutPress = () => {
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

  const handleEditPress = () => {
    props.navigation.navigate('EditProfile', { user: currentLoggedUser });
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
        <Pressable
          style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
          onPress={handleEditPress}
        >
          <Text style={styles.btnTxt}>Edit Profile</Text>
        </Pressable>
      </View>
      <View style={styles.drawerContentContainer}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Log Out"
            labelStyle={{ marginLeft: -20 }}
            icon={() => <AntDesign name="logout" size={24} color="#1c1c1ead" />}
            onPress={handleLogoutPress}
          />
        </DrawerContentScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    justifyContent: 'space-between',
    padding: 30,
    paddingTop: 50,
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
  },
  drawerContentContainer: {
    flex: 4.5,
  },
  imageNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
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
    color: colors.darkGrey,
  },
  btn: {
    backgroundColor: colors.brown,
    padding: 10,
    borderRadius: 100,
    elevation: 5,
  },
  btnTxt: {
    fontFamily: 'Montserrat_500Medium',
    textAlign: 'center',
    color: 'white',
  },
  pressed: {
    opacity: 0.75,
  },
});
export default CustomDrawerContent;
