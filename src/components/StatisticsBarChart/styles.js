// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  mainView: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
    marginTop: 14,
  },
  barChart: {
    flex: 1,
    marginLeft: -20,
    overflow: 'hidden',
    width: '100%',
    height: 252,
  },
  innerView: {
    marginLeft: 15,
    marginVertical: 13,
    justifyContent: 'space-between',
    flex: 1,
  },
});
