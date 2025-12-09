// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../../theme';

export default StyleSheet.create({
  mainView: {
    width: '49%',
    height: 163,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 2,
  },
  innerView: {
    marginLeft: 15,
    marginVertical: 13,
    justifyContent: 'space-between',
    flex: 1,
  },
});
