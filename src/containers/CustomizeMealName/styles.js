// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  newMealView: {
    height: 57,
    backgroundColor: 'rgba(13, 130, 255, 0.1)',
    borderRadius: 6,
    borderColor: Colors.background.primary,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
