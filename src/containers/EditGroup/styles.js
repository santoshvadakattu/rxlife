import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.white,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.white,
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
