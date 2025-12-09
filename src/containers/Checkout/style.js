import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: Colors.white,
    minHeight: Metrics.screenHeight,
    paddingHorizontal: 10,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
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
