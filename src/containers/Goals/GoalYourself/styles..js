import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  btnStyle: {
    height: 45,
    padding: 0,
    marginTop: 5,
    borderRadius: 12,
    marginBottom: 20,
  },
  btnStyleGender: {
    height: 55,
    padding: 0,
    marginTop: 5,
    borderRadius: 6,
    marginBottom: 20,
    flex: 0.5,
    backgroundColor: '#5B647A',
  },
  viewYourself: {
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  viewGender: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: Colors.border,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    gap: 10,
    height: 57,
    alignItems: 'center',
  },
});
