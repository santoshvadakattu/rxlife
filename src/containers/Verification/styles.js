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
    marginBottom: 15,
    height: Metrics.screenHeight,
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
  infoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    marginTop: 50,
    maxWidth: 288,
    justifyContent: 'center',
  },
  alreadyHaveAnAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  codeFieldRoot: {
    marginTop: 30,
    width: 330,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cell: {
    textAlign: 'center',
    color: Colors.black2,
  },
  focusCell: {
    borderColor: Colors.background.primary,
  },

  progress: {
    marginTop: 50,
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cellWrapper: {
    borderWidth: 1,
    borderColor: Colors.borders.input,
    width: 72,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    // marginHorizontal: 10,
  },

  buttonBorders: {
    borderWidth: 1,
    borderColor: Colors.text.theme,
  },
});
