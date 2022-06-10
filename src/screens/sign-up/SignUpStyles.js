import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
  },
  avoidingView: {
    width: '100%',
  },
  signInUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '55%',
    marginBottom: 10,
  },
  signInUpActive: {
    fontFamily: 'Montserrat_500Medium',
    backgroundColor: colors.brown,
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
    backgroundColor: colors.teal,
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
