// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  cancelModal: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  tilteTxt: {
    color: Colors.black2,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  btnView: {
    flex: 0.5,
    height: 57,
    backgroundColor: Colors.background.red,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
