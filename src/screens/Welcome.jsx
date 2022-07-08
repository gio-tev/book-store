import { View, Text, Image, StyleSheet } from 'react-native';
import LoginNav from '../components/LoginNav';
import { colors } from '../utils/colors';
import CustomStatusbar from '../components/CustomStatusBar';

const Welcome = () => (
  <View style={styles.container}>
    <CustomStatusbar />
    <Image style={styles.img} source={require('../../assets/cover.jpg')} />
    <View style={styles.text1Container}>
      <Text style={styles.text1}>Welcome {'\n'} to Book Store</Text>
    </View>
    <Text style={styles.text2}>Let's get started!</Text>

    <LoginNav />
  </View>
);

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  img: {
    height: '40%',
    width: '100%',
  },
  text1Container: {
    marginTop: '10%',
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    color: colors.brown,
    fontSize: 30,
  },
  text2: {
    textAlign: 'center',
    fontFamily: 'Montserrat_500Medium',
    textAlign: 'center',
    color: colors.teal,
    marginTop: '8%',
    fontSize: 18,
  },
});
