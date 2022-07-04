import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorage = async (method, key, value) => {
  try {
    const response = await AsyncStorage[method](key, JSON.stringify(value));

    return response;
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

export default asyncStorage;
