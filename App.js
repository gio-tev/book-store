import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_500Medium,
} from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';

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
    <NavigationContainer>
      <Stack.Navigator
      // screenOptions={{
      //   headerShown: false,
      // }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//  <View style={styles.container}>
//  <StatusBar style="auto" />
//  </View>

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
