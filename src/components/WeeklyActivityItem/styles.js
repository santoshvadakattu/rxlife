// @flow
import {Dimensions, StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  mainView: {
    height: 76,
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
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%',
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bgImage: {
    width: 64,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImageStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 2,
  },
  bgInnerView: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.white,

    marginBottom: 7,
    marginLeft: 10,
  },
});
