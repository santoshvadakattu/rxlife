import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  btnStyle: {
    width: '100%',
    height: 47,
    backgroundColor: Colors.background.primary,
    padding: 0,
    marginTop: 0,
    marginBottom: 30,
  },
  txtStyle: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.white,
  },
});
