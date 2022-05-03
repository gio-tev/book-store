import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    // justifyContent: 'center',
    marginTop: '30%',
    alignItems: 'center',
  },
  success: {
    fontFamily: 'Montserrat_700Bold',
    color: '#6200EE',
    fontSize: 40,
  },
});

export default Success;
