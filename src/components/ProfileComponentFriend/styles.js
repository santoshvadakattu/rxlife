// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';
import Util from '../../util';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  profileView: {
    width: 148,
    height: 148,
    borderRadius: 74,
    borderColor: Colors.background.primary,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  requestBtnView: {
    width: '100%',
    height: 47,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.primary,
  },
  positiveBtnView: {
    width: 155,
    height: 47,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.primary,
  },
  nageviteBtnView: {
    width: 155,
    height: 47,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange3,
    marginLeft: 10,
  },
});
