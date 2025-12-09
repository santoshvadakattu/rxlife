import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 76,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.background.primary,
    backgroundColor: 'rgba(13, 130, 255, 0.2)',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fireView: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
