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
    marginBottom: 30,
  },
  introView: {
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 12,
    padding: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
    marginTop: 15,
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
  CarouseView: {
    backgroundColor: Colors.white,
    height: 59,
    width: '100%',
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
  },
});
