import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },

  image: {
    height: 52,
    width: 52,
    borderRadius: 26,
  },

  titleWrapper: {
    // flex: 1,
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    // width: 100%
  },
});
