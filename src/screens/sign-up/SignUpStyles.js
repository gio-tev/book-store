import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  signInUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '55%',
    marginBottom: 10,
  },
  signInUpActive: {
    fontFamily: 'Montserrat_500Medium',
    backgroundColor: '#6200EE',
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  signInUpInactive: {
    fontFamily: 'Montserrat_500Medium',
    color: 'grey',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ContinueForgotContainer: {
    textAlign: 'center',
    width: '92%',
  },
  continueBtn: {
    marginBottom: 5,
  },
  continueForgotActive: {
    backgroundColor: '#6200EE',
    padding: 20,
    borderRadius: 100,
    fontFamily: 'Montserrat_500Medium',
    color: '#fff',
    textAlign: 'center',
  },
  continueForgotInactive: {
    padding: 20,
    fontFamily: 'Montserrat_700Bold',
    color: '#6200EE',
    textAlign: 'center',
  },
});
