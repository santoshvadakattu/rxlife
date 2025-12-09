import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.borders.input,
    borderRadius: 12,
    marginTop: 10,
  },

  leftIcon: {
    width: 19,
    height: 21,
    objectFit: 'contain',
  },

  rightIcon: {
    width: 18,
    height: 18,
    objectFit: 'contain',
    marginLeft: 'auto',
  },

  text: {
    paddingLeft: 15,
  },
});
