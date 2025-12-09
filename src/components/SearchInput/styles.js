import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    height: 57,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(55, 55, 55, 0.1)',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  inputText: {
    height: 50,
    marginTop: 0,
    borderWidth: 0,
    borderColor: Colors.transparent,
    justifyContent: 'center',
    marginLeft: 10,
  },
  inputStyle: {
    alignItems: 'center',
    height: 50,
    color: Colors.black,
  },
});
