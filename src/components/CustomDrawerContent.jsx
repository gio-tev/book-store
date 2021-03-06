import { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { AppContext } from '../store/AppContext';
import { colors } from '../utils/colors';
import Button from './UI/Button';
import asyncStorage from '../utils/asyncStorage';

function CustomDrawerContent(props) {
  const { state, dispatch } = useContext(AppContext);
  const { currentLoggedUser } = state;

  const handleLogoutPress = () => {
    dispatch({ type: 'LOG_OUT' });

    asyncStorage('removeItem', 'Account');

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

        <Button
          pressable={({ pressed }) => [styles.btn, pressed && styles.pressed]}
          text={styles.btnTxt}
          onPress={handleEditPress}
        >
          Edit Profile
        </Button>
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

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 51.515282,
          longitude: -0.091392,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          // latitudeDelta: 0.2522,
          // longitudeDelta: 0.2521,
        }}
      >
        <Marker coordinate={{ latitude: 51.515282, longitude: -0.091392 }} />
      </MapView>
    </View>
  );
}

export default CustomDrawerContent;

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
  map: {
    width: '100%',
    height: '35%',
  },
});
