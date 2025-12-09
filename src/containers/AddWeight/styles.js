// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import {select} from 'redux-saga/effects';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  contentWrapper: {
    paddingBottom: 0,
    marginBottom: 35,
    // flex: 1,
  },
  btnStyle: {
    height: 50,
    padding: 0,
    marginTop: 5,
    borderRadius: 12,
    marginBottom: 30,
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
  imgView: {
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
