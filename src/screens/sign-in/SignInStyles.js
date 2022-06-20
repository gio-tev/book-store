import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 80,
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
  continueBtnActive: {
    backgroundColor: colors.teal,
    marginBottom: 5,
    padding: 20,
    borderRadius: 100,
  },
  continueBtnInactive: {
    padding: 20,
    marginBottom: 5,
    borderRadius: 100,
  },
  continueForgotActive: {
    fontFamily: 'Montserrat_500Medium',
    color: '#fff',
    textAlign: 'center',
  },
  continueForgotInactive: {
    fontFamily: 'Montserrat_700Bold',
    color: colors.teal,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
