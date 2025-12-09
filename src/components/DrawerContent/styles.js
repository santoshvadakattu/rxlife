import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 20,
    position: 'relative',
  },

  logo: {
    height: 62,
    width: 62,
    objectFit: 'contain',
  },

  whiteBox: {
    width: 69,
    height: 77,
    // position: 'absolute',
    backgroundColor: Colors.white,
    // right: -20,
    borderBottomLeftRadius: 34.5,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 10,
  },

  cancelIcon: {
    height: 31,
    width: 31,
    objectFit: 'contain',
  },

  Profile: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  profileImage: {
    height: 54,
    width: 54,
    marginRight: 10,
    marginTop: 2,
    borderRadius: 26,
  },

  listContainer: {
    flex: 1,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
  },

  icon: {
    height: 19,
    width: 16,
    objectFit: 'contain',
    marginRight: 10,
  },

  logoutBtn: {
    backgroundColor: 'rgba(255,255,255,.2)',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 12,
    width: '100%',
    marginVertical: 20,
  },

  logoutIcon: {
    height: 18,
    width: 18,
    marginRight: 18,
  },

  logoutArrow: {
    height: 12.83,
    width: 6.58,
    marginLeft: 'auto',
  },
});
