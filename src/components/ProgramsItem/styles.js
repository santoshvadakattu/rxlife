import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginTop: 20,
    height: 223,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  bgImage: {
    borderRadius: 12,
  },

  marginView: {
    flex: 1,
    // padding: 9,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  contentBox: {
    height: 87,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 6,
    width: ' 100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  titleWrapper: {
    // alignItems: 'center',
    marginLeft: 15,
    marginTop: 5,
  },

  challengeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 15,
    marginTop: 10,
  },

  participants: {
    width: 47,
    height: 23.1,
  },

  image: {
    height: 23.1,
    width: 23.1,
    borderRadius: 11.55,
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },

  videoIconView: {
    position: 'absolute',
    left: 20,
    top: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 2,
    resizeMode: 'contain',
  },

  videoIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },

  modalWrapper: {
    backgroundColor: Colors.black,
    borderRadius: 12,
    // padding: 25,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  crossWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    top: 10,
    right: 10,
    backgroundColor: Colors.white,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  cross: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },

  challengeOverview: {
    color: Colors.white,
    fontSize: Fonts.size.xxxxxSmall,
    marginTop: 8,
    lineHeight: 15,
  },
});
