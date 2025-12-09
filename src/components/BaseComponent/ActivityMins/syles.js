// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../../theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 88,
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
    paddingHorizontal: 22,
    justifyContent: 'center',
    marginTop: 20,
  },
});
