// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    height: 152,
    width: '100%',
    marginBottom: 15,
  },
  LinearView: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: 107,
    bottom: 0,
    borderRadius: 20,
    zIndex: 11,
    justifyContent: 'flex-end',
  },
  desView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingBottom: 10,
    alignItems: 'flex-end',
  },
  addQuickView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingVertical: 12.5,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: Colors.white,
    borderRadius: 12,
    margin: 1,
    height: 58,
    marginBottom: 15,
    alignItems: 'center',
  },
});
