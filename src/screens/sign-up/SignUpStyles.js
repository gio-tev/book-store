import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 80,
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
  signInUpActiveBtn: {
    backgroundColor: colors.brown,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  signInUpActiveTxt: {
    fontFamily: 'Montserrat_500Medium',
    color: '#fff',
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
    backgroundColor: colors.teal,
    padding: 20,
    borderRadius: 100,
    marginBottom: 50,
  },
  continueForgotActive: {
    fontFamily: 'Montserrat_500Medium',
    color: '#fff',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
