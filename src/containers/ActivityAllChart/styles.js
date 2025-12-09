// @flow
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 15,
  },
  CarouseView: {
    backgroundColor: Colors.white,
    height: 59,
    width: '100%',
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
  },
  heartBiteView: {
    width: '100%',
    height: 59,
    borderRadius: 12,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
    marginTop: 15,
  },
  separaterView: {backgroundColor: '#CDCDCD', height: 18, width: 1},
});
