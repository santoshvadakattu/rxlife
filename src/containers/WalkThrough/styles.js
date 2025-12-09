import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background?.primary,
    alignItems: 'center',
  },

  imageContainer: {
    flex: 1,
    backgroundColor: Colors.background?.primary,
    alignItems: 'center',
    height: Dimensions.get('screen').height + 3,
  },

  goalContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    // backgroundColor: 'red',
    width: '100%',
    left: 0,
  },

  goalView: {
    paddingBottom: 30,
  },

  goalText: {
    fontFamily: Fonts.type.extraBold,
    fontSize: 40,
    fontWeight: '800',
    lineHeight: 42,
    letterSpacing: 0.05,
    textAlign: 'left',
    color: Colors.white,
  },
});
