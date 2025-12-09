// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 3,
    fontFamily: Fonts.type.base,
    color: Colors.grey5,
    fontSize: Fonts.size.xSmall,
    paddingLeft: 50,
    position: 'relative',
    paddingRight: 20,
    paddingVertical: 18,
    backgroundColor: 'transparent',
  },
  buttonOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 18 * 0.58,
    height: 18,
    ...AppStyles.mRight10,
  },
  multilineInput: {
    height: 120,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: 'top',
  },

  leftIconWrapper: {
    position: 'absolute',
    left: 20,
    top: 25,
  },

  leftIcon: {
    height: 15,
    width: 18,
    objectFit: 'contain',
  },
  rightIconWrapper: {
    position: 'absolute',
    right: 20,
    top: 25,
  },
  rightIcon: {
    width: 22,
    height: 18,
    objectFit: 'contain',
  },
});
