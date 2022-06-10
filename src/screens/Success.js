import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

const Success = () => {
  return (
    <View style={styles.successContainer}>
      <Text style={styles.success}>Success!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    marginTop: '30%',
    alignItems: 'center',
  },
  success: {
    fontFamily: 'Montserrat_700Bold',
    color: colors.teal,
    fontSize: 40,
  },
});

export default Success;
