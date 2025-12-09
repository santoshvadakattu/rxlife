// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: StatusBar.currentHeight + 5,
    paddingHorizontal: Metrics.smallMargin,
    justifyContent: 'space-between',
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey3,
  },
  btnImage: {
    maxWidth: 20,
    maxHeight: 20,
    height: 20,
    width: 20,
    objectFit: 'contain',
  },
  btnWrapper: {
    paddingVertical: Metrics.smallMargin,
    justifyContent: 'center',
    minWidth: 30,
  },
  rightBtn: {
    alignItems: 'flex-end',
  },
  searchHeader: {
    height: Metrics.navBarHeight + 50,
  },
});
