// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  emailIcon: {
    width: 19,
    height: 17,
    maxWidth: 19,
    maxHeight: 17,
  },
  firstFieldMargin: {
    marginTop: 40,
  },
  shareWithView: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  separator: {
    backgroundColor: '#F4F3F7',
    height: 2,
    marginTop: 15,
  },
  btnStyle: {
    height: 45,
    padding: 0,
    marginTop: 5,
    borderRadius: 6,
  },
  dropDrowView: {
    position: 'absolute',
    right: 20,
    backgroundColor: Colors.white,
    opacity: 1,
    top: 50,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
    padding: 10,
    borderRadius: 12,
    borderColor: Colors.text.blueGray,
    borderWidth: 1,
    zIndex: 10,
  },
  publicView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pickImage: {
    backgroundColor: 'rgba(97, 216, 94, 0.1)',
    borderRadius: 12,
    borderColor: '#61D85E',
    height: 127,
    borderStyle: 'dashed',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  imgViewCross: {
    position: 'absolute',
    top: 4,
    right: 0,
    backgroundColor: Colors.red,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  imageView: {
    height: 127,
    width: '100%',
    borderRadius: 12,
    marginTop: 15,
  },
});
