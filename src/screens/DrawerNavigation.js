import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './Home';
import Cart from './Cart';
import Orders from './Orders';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { colors } from '../utils/colors';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.teal,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Montserrat_500Medium',
        },
        drawerLabelStyle: {
          marginLeft: -20,
          fontFamily: 'Montserrat_500Medium',
        },
        drawerActiveTintColor: colors.teal,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color }) => {
            return <AntDesign name="home" size={24} color={color} />;
          },
        }}
      />

      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-cart-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={Orders}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="checkbox-marked-circle-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
