import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileView: {
    width: 148,
    height: 148,
    borderRadius: 74,
    borderColor: Colors.background.primary,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    alignSelf: 'center',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  editIconView: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    position: 'absolute',
    backgroundColor: Colors.background.primary,
    right: 5,
    bottom: 5,
    borderWidth: 2.5,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
