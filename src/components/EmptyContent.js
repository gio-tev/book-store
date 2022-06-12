import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const EmptyContent = props => {
  const navigation = useNavigation();

  const handleEmptyCart = () => {
    navigation.navigate('DrawerNavigation', { screen: 'Home' });
  };

  return (
    <View style={styles.emptyCartContainer}>
      <View style={styles.iconContainer}>
        {props.icon === 'Cart' && (
          <Ionicons
            style={styles.icon}
            name="ios-cart-outline"
            size={35}
            color={colors.brown}
          />
        )}
        {props.icon === 'Orders' && (
          <MaterialCommunityIcons
            style={styles.icon}
            name="checkbox-marked-circle-outline"
            size={35}
            color={colors.brown}
          />
        )}
      </View>
      <Text style={styles.cartTxt}>{props.title}</Text>
      <Pressable style={styles.cartBtnContainer} onPress={handleEmptyCart}>
        <Text style={styles.emptyCartBtn}>SHOP NOW</Text>
        <FontAwesome5 name="arrow-right" size={18} color="white" />
      </Pressable>
    </View>
  );
};

export default EmptyContent;

const styles = StyleSheet.create({
  emptyCartContainer: {
    marginTop: '20%',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8D8D8',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  icon: {
    fontFamily: 'Montserrat_700Bold',
  },
  cartTxt: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 25,
    color: colors.darkGrey,
    marginBottom: 30,
    textAlign: 'center',
  },
  cartBtnContainer: {
    flexDirection: 'row',
    backgroundColor: colors.brown,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 50,
  },
  emptyCartBtn: {
    fontFamily: 'Montserrat_700Bold',
    color: 'white',
    marginRight: 5,
  },
});
