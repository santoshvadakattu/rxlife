import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  mainView: {
    backgroundColor: Colors.white,
    width: '99.5%',
    borderRadius: 12,
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.05,
    margin: 1,
    shadowRadius: 1.5,
    elevation: 1,
    marginTop: 15,
    flexDirection: 'row',
  },
});
