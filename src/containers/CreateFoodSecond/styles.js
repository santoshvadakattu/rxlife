// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },

  shareWithView: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  separator: {
    backgroundColor: '#F4F3F7',
    height: 2,
    marginTop: 15,
  },
  btnStyle: {
    height: 45,
    padding: 0,
    marginTop: 5,
    borderRadius: 6,
  },
});
