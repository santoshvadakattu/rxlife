// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme';

export default StyleSheet.create({
  contianer: {
    padding: 15,
    width: '100%',
    height: 125,
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
    marginTop: 20,
  },
  eachItemView: {
    width: 23,
    height: 38,
    borderRadius: 150,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  smallCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.white,
  },
});
