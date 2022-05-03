// import { StatusBar } from 'expo-status-bar';
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
        <Stack.Navigator
        // screenOptions={{
        //   headerShown: false,
        // }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Success" component={Success} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}
