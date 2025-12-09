import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  mainView: {
    backgroundColor: Colors.white,
    width: '99.5%',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 0.5,
    elevation: 2,
    marginTop: 15,
    minHeight: 200,
    borderRadius: 12,
    justifyContent: 'space-between',
    margin: 1,
  },
});
