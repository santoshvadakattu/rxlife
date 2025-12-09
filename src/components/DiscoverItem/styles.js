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
    height: 55,
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
    alignItems: 'center',
  },
});
