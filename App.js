import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_500Medium,
} from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import AppContextProvider from './src/store/AppContext';
import Welcome from './src/screens/Welcome';
import SignIn from './src/screens/sign-in/SignIn';
import SignUp from './src/screens/sign-up/SignUp';
import Success from './src/screens/Success';
import Book from './src/screens/Book';
import DrawerNavigation from './src/screens/DrawerNavigation';
import OrderPlaced from './src/screens/OrderPlaced';

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
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sign In"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Book"
            component={Book}
            options={{
              headerStyle: {
                backgroundColor: '#6200EE',
              },
              headerTitleStyle: {
                color: '#fff',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="Success"
            component={Success}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderPlaced"
            component={OrderPlaced}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DrawerNavigation"
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}
