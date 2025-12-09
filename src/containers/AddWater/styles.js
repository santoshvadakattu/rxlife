import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  btnView: {
    backgroundColor: 'rgba(13, 130, 255, 0.1)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.33,
    height: 36,
  },
  btnStyle: {
    height: 45,
    padding: 0,
    marginTop: 5,
    borderRadius: 6,
    marginBottom: 30,
  },
});
