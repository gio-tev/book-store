import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_500Medium,
} from '@expo-google-fonts/montserrat';
import { Ionicons } from '@expo/vector-icons';

import AppContextProvider from './src/store/AppContext';
import AsyncStorageWelcome from './src/screens/AsyncStorageWelcome';
import { colors } from './src/utils/colors';
import Welcome from './src/screens/Welcome';
import SignIn from './src/screens/sign-in/SignIn';
import SignUp from './src/screens/sign-up/SignUp';
import Success from './src/screens/Success';
import Book from './src/screens/Book';
import DrawerNavigation from './src/screens/DrawerNavigation';
import OrderPlaced from './src/screens/OrderPlaced';
import EditProfile from './src/screens/EditProfile';
import ForgotPassword from './src/screens/ForgotPassword';
import Button from './src/components/UI/Button';
import GetPromoCode from './src/screens/GetPromoCode';
import AddPromoCode from './src/screens/AddPromoCode';

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const iconCart = <Ionicons name="ios-cart-outline" size={30} color={'white'} />;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AsyncStorageWelcome" component={AsyncStorageWelcome} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Forgot Password" component={ForgotPassword} />
            <Stack.Screen name="Sign In" component={SignIn} />
            <Stack.Screen name="Sign Up" component={SignUp} />
            <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
            <Stack.Screen name="Success" component={Success} />
            <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
            <Stack.Screen
              name="GetPromoCode"
              component={GetPromoCode}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.teal,
                },
                headerTitleStyle: {
                  fontFamily: 'Montserrat_500Medium',
                },
                headerTintColor: '#fff',
                title: 'Get Code',
              }}
            />
            <Stack.Screen
              name="AddPromoCode"
              component={AddPromoCode}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.teal,
                },
                headerTitleStyle: {
                  fontFamily: 'Montserrat_500Medium',
                },
                headerTintColor: '#fff',
                title: 'Add Code',
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.teal,
                },
                headerTitleStyle: {
                  fontFamily: 'Montserrat_500Medium',
                },
                headerTintColor: '#fff',
                title: 'Edit Profile',
              }}
            />
            <Stack.Screen
              name="Book"
              component={Book}
              options={({ navigation }) => {
                return {
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: colors.teal,
                  },
                  headerTitleStyle: {
                    fontFamily: 'Montserrat_500Medium',
                  },
                  headerTintColor: '#fff',
                  title: '',
                  headerRight: () => (
                    <Button
                      pressable={({ pressed }) => [
                        { marginRight: 25 },
                        pressed && { transform: [{ scale: 1.1 }] },
                      ]}
                      onPress={() => navigation.navigate('Cart')}
                      icon={iconCart}
                    />
                  ),
                };
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContextProvider>
    </SafeAreaProvider>
  );
}
