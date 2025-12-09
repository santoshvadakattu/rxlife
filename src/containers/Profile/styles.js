import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  editGoalsBtn: {
    height: 47,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 15,
    borderColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
