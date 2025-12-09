// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: StatusBar.currentHeight + 5,
    marginHorizontal: 25,
    justifyContent: 'space-between',
  },

  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  imgView: {
    width: 30,
    height: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  arrowImg: {width: 11, height: 18},
});
