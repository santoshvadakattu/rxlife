// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  txtKcal: {
    position: 'absolute',
    top: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  txtKcalValue: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: '600',
    width: 60,
    textAlign: 'center',
  },
});
