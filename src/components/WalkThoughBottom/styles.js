// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    marginBottom: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  stepView: {
    flexDirection: 'row',
    // width: 60,
    // justifyContent: 'space-around',
    flex: 1,
  },
  dotView: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.white,
    opacity: 0.5,
    marginRight: 2,
    right: 10,
    marginLeft: 10,
  },
  selectedDotLine: {
    width: 26,
    height: 10,
    backgroundColor: Colors.white,
    right: 10,
    borderRadius: 5,
    opacity: 1,
  },
  nextBtn: {
    width: 34,
    height: 34,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: 10,
  },
});
