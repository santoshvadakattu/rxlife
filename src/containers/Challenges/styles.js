import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    // flex: 1,
    // // paddingTop: 30,
    // paddingHorizontal: 20,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    // alignItems: 'center',
  },
  wrapper: {
    backgroundColor: Colors.white,
  },

  field: {
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
