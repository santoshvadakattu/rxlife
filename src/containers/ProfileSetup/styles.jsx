import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
  },

  contentWrapper: {
    paddingHorizontal: 10,
    paddingBottom: 0,
    marginBottom: 35,
  },

  firstFieldMargin: {
    marginTop: 40,
  },

  passwordIcon: {
    width: 16,
    height: 23,
    maxWidth: 16,
    maxHeight: 23,
  },

  profileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  imageWrapper: {
    borderWidth: 4,
    borderColor: Colors.background.primary,
    backgroundColor: Colors.white,
    height: 140,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 74,
  },

  profileImage: {
    height: 121,
    width: 121,
    objectFit: 'contain',
    borderRadius: 60.5,
  },
});
