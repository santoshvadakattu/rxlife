import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F5F6F9',
    paddingHorizontal: 10,
  },

  contentWrapper: {
    paddingHorizontal: 10,
    paddingBottom: 0,
    marginBottom: 15,
  },

  firstFieldMargin: {
    marginTop: 40,
  },

  emailIcon: {
    width: 19,
    height: 17,
    maxWidth: 19,
    maxHeight: 17,
  },
  passwordIcon: {
    width: 16,
    height: 23,
    maxWidth: 16,
    maxHeight: 23,
  },

  passwordIcoWrapper: {
    top: 20,
  },
  alreadyHaveAnAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
