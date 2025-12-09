import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  settingBox: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 63,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1.15,
    shadowRadius: 1.5,
    elevation: 2,
  },

  imageWrapper: {
    height: 41,
    width: 41,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20.5,
    marginRight: 15,
  },

  notiImage: {
    width: 18,
    height: 20,
  },
  passwordIcon: {
    width: 14,
    height: 21,
  },
});
