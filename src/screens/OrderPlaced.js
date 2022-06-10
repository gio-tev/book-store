import { View, StyleSheet, Pressable, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const OrderPlaced = ({ navigation }) => {
  const handleClosePress = () => {
    navigation.navigate('DrawerNavigation', { screen: 'Home' });
  };

  const handleOrdersPress = () => {
    navigation.navigate('DrawerNavigation', { screen: 'Orders' });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.close} onPress={handleClosePress}>
        <Fontisto name="close-a" size={25} color={colors.brown} />
      </Pressable>

      <View style={styles.content}>
        <View style={styles.check}>
          <FontAwesome5 name="check" size={40} color={colors.teal} />
        </View>

        <Text style={styles.order}>Order Placed!</Text>
        <Text style={styles.placed}>Your order was placed successfully</Text>

        <Pressable style={styles.btn} onPress={handleOrdersPress}>
          <Text style={styles.btnTxt}>MY ORDERS</Text>
          <FontAwesome5 name="arrow-right" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    top: 25,
    right: 30,
  },
  content: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '50%',
    marginTop: '-20%',
  },
  check: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 100,
  },
  order: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 30,
    color: colors.darkGrey,
  },
  placed: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 17,
    color: 'grey',
    marginTop: -15,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brown,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 100,
    marginTop: 100,
  },
  btnTxt: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 17,
    color: '#fff',
    marginRight: 5,
  },
});

export default OrderPlaced;
