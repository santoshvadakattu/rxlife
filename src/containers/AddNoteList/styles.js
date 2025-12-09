import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  headView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
    height: 47,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingTop: 15,
    paddingHorizontal: 54,
    paddingBottom: 0,
  },
  NotesBtns: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.background.primary,
  },
  btnStyle: {
    height: 45,
    padding: 0,
    marginTop: 5,
    borderRadius: 6,
  },
});

export default styles;
