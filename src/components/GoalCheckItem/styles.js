import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 12,
  },

  checkBox: {
    // backgroundColor: Colors.background.secondary,
    width: 24,
    height: 24,
  },

  text: {
    marginLeft: 15,
    lineHeight: 21,
    width: '80%',
  },
});
