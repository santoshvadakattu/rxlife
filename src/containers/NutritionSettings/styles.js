// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  nutritionHeader: {
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
    padding: 15,
    paddingHorizontal: 30,
    paddingBottom: 0,
  },
  btnNutritionItem: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.background.primary,
    paddingHorizontal: 6,
  },
  nutritionDetails: {
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
  },
});
