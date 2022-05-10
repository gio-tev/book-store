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
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerLabelStyle: {
          marginLeft: -20,
          fontFamily: 'Montserrat_500Medium',
        },
        drawerActiveBackgroundColor: 'transparent',
        color: '#6200EE',
        drawerActiveTintColor: '#6200EE',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <Header headerTitle={'Home'} />,
          drawerIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff',
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
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff',
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
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff',
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
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
