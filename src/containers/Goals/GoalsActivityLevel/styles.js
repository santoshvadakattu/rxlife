import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  containerItem: {
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1.5,
    elevation: 1,
    margin: 1,
    paddingHorizontal: 20,
    minHeight: 65,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 13,
  },

  btnStyle: {
    height: 45,
    padding: 0,
    marginTop: 5,
    borderRadius: 12,
    marginBottom: 20,
  },
});
