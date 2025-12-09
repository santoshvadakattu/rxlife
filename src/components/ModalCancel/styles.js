// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  cancelModal: {
    // height: 208,
    width: '100%',
    borderRadius: 12,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  tilteTxt: {
    color: Colors.black2,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    width: 236,
    height: 60,
  },
  btnView: {
    width: 146,
    height: 57,
    backgroundColor: Colors.background.red,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
