// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  videoView: {
    height: 200,
  },
  loaderStyle: {
    position: 'absolute',
    top: 50,
    bottom: 50,
    right: 50,
    left: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
