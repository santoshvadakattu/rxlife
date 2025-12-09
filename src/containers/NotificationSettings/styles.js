import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    flex: 1,
    paddingHorizontal: 10,
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },

  itemWrapper: {
    height: 63,
    borderRadius: 12,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: 'red',
    marginTop: 20,
  },
});
