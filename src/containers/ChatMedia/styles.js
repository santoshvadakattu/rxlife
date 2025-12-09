import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },

  titleWrapper: {
    width: 79,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(55,55,55, .1)',
    height: 23,
    marginTop: 15,
    borderRadius: 12,
  },

  imageStyle: {
    width: '25%',
    height: 78,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: Colors.white,
  },
});
