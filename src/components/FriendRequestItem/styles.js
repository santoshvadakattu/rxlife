import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    height: 102,
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
  acceptBtn: {
    height: 33,
    borderRadius: 6,
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  rejectBtn: {
    height: 33,
    borderRadius: 6,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: Colors.orange3,
  },
  btnsView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  profileImage: {
    width: 71,
    height: 71,
    borderRadius: 35.5,
  },
  icon: {
    height: 35,
    width: 27,
    objectFit: 'contain',
  },
});
