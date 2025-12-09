import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    flex: 1,
  },

  chatRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.white,
    marginBottom: 20,
    borderRadius: 12,
  },

  profilePhoto: {
    height: 52,
    width: 52,
    borderRadius: 26,
  },

  chatBtnWrapper: {
    marginLeft: 'auto',
  },
  chatBtnImage: {
    height: 22.28,
    width: 22.26,
  },
});
