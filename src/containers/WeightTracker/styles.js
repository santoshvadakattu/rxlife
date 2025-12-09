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
  weightView: {
    marginTop: 20,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    minHeight: 60,
    width: '100%',
    justifyContent: 'center',
  },

  graphView: {
    marginTop: 20,
    // height: 350,
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    flex: 0.7,
  },
  entriesView: {
    marginTop: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    padding: 20,

    borderRadius: 12,
    flex: 0.4,
  },
  selectedTrack: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTxt: {
    color: Colors.white,
  },
  btnStyle: {
    height: 50,
    padding: 0,
    marginTop: 5,
    marginBottom: 30,
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.background.primary,
    borderRadius: 12,
    marginTop: 20,
  },
  btnText: {
    color: Colors.background.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  separator: {
    backgroundColor: '#F4F3F7',
    height: 2,
  },
});
