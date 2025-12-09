// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
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
    paddingHorizontal: 25,
    paddingBottom: 0,
  },
  btnNutritionItem: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.background.primary,
  },
  btnStyle: {
    height: 45,
    padding: 0,
    marginTop: 5,
    borderRadius: 6,
    marginBottom: 30,
  },
});
