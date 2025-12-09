import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wrapper: {
    backgroundColor: Colors.white,
  },

  field: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 18,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 12,
    borderColor: Colors.borders.input,
    borderWidth: 1,
  },

  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
});
