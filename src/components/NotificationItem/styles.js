// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  cantainer: {
    // width: '100%',
    // minHeight: 76,
    borderRadius: 12,
    backgroundColor: Colors.white,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 3,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconView: {
    backgroundColor: Colors.background.primary,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
