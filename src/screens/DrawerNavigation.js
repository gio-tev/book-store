import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import BookDetails from './BookDetails';
import Cart from './Cart';
import Orders from './Orders';
import Header from '../components/Header';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
          headerTitle: () => <Header headerTitle={'Home'} />,
          drawerIcon: ({ color }) => {
            return <AntDesign name="home" size={24} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Book Details"
        component={BookDetails}
        options={{
          headerTitle: () => <Header headerTitle={'Book Details'} />,
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-book-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          headerTitle: () => <Header headerTitle={'Cart'} />,
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-cart-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={Orders}
        options={{
          headerTitle: () => <Header headerTitle={'Orders'} />,
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
