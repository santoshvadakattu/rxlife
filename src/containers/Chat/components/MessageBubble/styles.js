import {StyleSheet} from 'react-native';
import {Metrics} from '../../../../theme';

export default StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    zIndex: 101,
  },

  reactionContainer: {
    // position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 43.06,
    zIndex: 100,
    width: 260,
  },
});
