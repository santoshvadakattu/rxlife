import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  btnStyle: {
    height: 45,
    padding: 0,
    marginTop: 5,
    borderRadius: 12,
    marginBottom: 30,
  },

  wrapper: {
    flex: 1,
  },

  addPaymentBtn: {
    backgroundColor:
      'linear-gradient(0deg, #0D82FF, #0D82FF), linear-gradient(0deg, rgba(13, 130, 255, 0.1), rgba(13, 130, 255, 0.1))',
    borderWidth: 1,
    borderColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 12,
    height: 136,
  },

  cardInfo: {
    backgroundColor: Colors.background.primary,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 63,
    marginTop: 15,
    shadowColor: 'rgba(10, 23, 35, 0.05)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 8, // Adjust the elevation as needed
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  cardInfoImageBG: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 245, 250, 1)',
    height: 41,
    width: 41,
    borderRadius: 20.5,
    marginRight: 10,
  },

  cardInfoImage: {
    height: 10,
    width: 29,
  },

  cancelBtn: {
    marginLeft: 'auto',
  },

  transactionWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginTop: 15,
    flex: 1,
  },

  transaction: {
    borderBottomColor: 'rgba(55, 55, 55, .05)',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },

  'transaction:last-child': {
    borderBottomWidth: 0,
  },
  space: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  opacity: {
    opacity: 0.5,
  },

  addPaymentBtn: {
    backgroundColor:
      'linear-gradient(0deg, #0D82FF, #0D82FF), linear-gradient(0deg, rgba(13, 130, 255, 0.1), rgba(13, 130, 255, 0.1))',
    borderWidth: 1,
    borderColor: Colors.background.primary,
    // borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 12,
    height: 63,
    borderStyle: 'dashed',
  },

  cardInfo: {
    backgroundColor: Colors.background.primary,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 63,
    marginTop: 15,
    shadowColor: 'rgba(10, 23, 35, 0.05)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 8, // Adjust the elevation as needed
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  cardInfoImageBG: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 245, 250, 1)',
    height: 41,
    width: 41,
    borderRadius: 20.5,
    marginRight: 10,
  },

  cardInfoImage: {
    height: 10,
    width: 29,
  },

  cancelBtn: {
    marginLeft: 'auto',
  },
});
