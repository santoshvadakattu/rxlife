import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
  },

  newMessageWrapper: {
    height: 58,
    width: 58,
    position: 'absolute',
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 29,
    bottom: 30,
    right: 30,
    zIndex: 2,
  },

  actionButtonWrapper: {
    height: 58,
    width: 58,
    flex: 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 29,
    bottom: 60,
    right: 50,
    zIndex: 2,
    top: 'auto',
    left: 'auto',
    // borde
  },

  newMessageWrapperImage: {
    height: 22.28,
    width: 22.26,
  },

  actionItemContainer: {
    right: 35,
    padding: 0,
    shadowOffset: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    borderWidth: 0,
  },

  actionItemText: {
    fontSize: 14,
    fontWeight: 500,
    fontFamily: Fonts.type.medium,
  },
});
