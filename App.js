import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import { useFonts, Montserrat_700Bold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';

import AsyncStorageWelcome from './src/screens/AsyncStorageWelcome';
import { colors } from './src/utils/colors';
import AppContextProvider from './src/store/AppContext';
import Welcome from './src/screens/Welcome';
import SignIn from './src/screens/sign-in/SignIn';
import SignUp from './src/screens/sign-up/SignUp';
import Success from './src/screens/Success';
import Book from './src/screens/Book';
import DrawerNavigation from './src/screens/DrawerNavigation';
import OrderPlaced from './src/screens/OrderPlaced';
import EditProfile from './src/screens/EditProfile';

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AsyncStorageWelcome" component={AsyncStorageWelcome} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Sign In" component={SignIn} />
            <Stack.Screen name="Sign Up" component={SignUp} />
            <Stack.Screen name="Success" component={Success} />
            <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
            <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
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
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.teal,
                },
                headerTitleStyle: {
                  fontFamily: 'Montserrat_500Medium',
                },
                headerTintColor: '#fff',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContextProvider>
    </SafeAreaProvider>
  );
}
