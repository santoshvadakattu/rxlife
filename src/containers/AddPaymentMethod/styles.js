import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: Colors.white,
    minHeight: Metrics.screenHeight,
    paddingHorizontal: 10,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 30,
  },

  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
