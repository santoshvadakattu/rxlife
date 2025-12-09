// @flow
import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 18,
    padding: 18,
    width: '100%',
  },
  spinner: {
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.5,
  },
  icon: {
    position: 'absolute',
    width: Metrics.icon.normal,
    height: Metrics.icon.normal,
  },
});
