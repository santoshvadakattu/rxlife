// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  individualView: {
    width: '100%',
    height: 65,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 2,
    justifyContent: 'center',
    marginTop: 15,
  },
  appleView: {
    width: 45,
    height: 45,
    borderRadius: 6,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    marginLeft: 16,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  containerModal: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  containerModalHeader: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  btnView: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: 'rgba(204, 193, 255, 0.8)',
    height: 63,
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  deviceIconVIew: {
    backgroundColor: '#AF36DA',
    width: 45,
    height: 45,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt2: {
    flex: 0.95,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
  },
});
