import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    padding: 15,
    width: '100%',
    maxHeight: 400,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 1,

    marginTop: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});
