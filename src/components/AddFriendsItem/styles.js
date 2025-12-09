import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    height: 76,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 12,
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    height: 19,
    width: 16,
    objectFit: 'contain',
    marginRight: 10,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 10,
    marginTop: 2,
  },
});
