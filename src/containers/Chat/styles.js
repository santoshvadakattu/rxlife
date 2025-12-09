import {StatusBar, StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
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
    zIndex: 999,
    top: 30,
    left: 20,
    // backgroundColor: Colors.white,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  cross: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },

  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  reactionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    paddingHorizontal: 10,
    paddingTop: StatusBar.currentHeight + 55,
  },

  reactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },

  bottomSheetListContainer: {
    backgroundColor: Colors.background.chatColor,
    padding: 5,
  },
  replyView: {
    width: '100%',
    backgroundColor: 'rgba(2, 116, 235, 0.08)',
    minHeight: 58,
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 60,
    borderLeftWidth: 4,
    borderLeftColor: '#0274EB',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  crossBtnView: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
});
