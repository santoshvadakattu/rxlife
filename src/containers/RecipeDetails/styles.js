// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import {sep} from 'path';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  detailView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
    backgroundColor: Colors.white,
    marginTop: 15,
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 15,
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
  breakfastView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
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
    marginTop: 15,
  },
});
