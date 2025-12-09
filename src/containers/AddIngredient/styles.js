// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import {IngredientItem} from '../../components';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },

  IngredientView: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginTop: 25,
    flex: 1,
    marginBottom: 20,
  },

  btnStyle: {
    height: 45,
    padding: 0,
    marginTop: 5,
    borderRadius: 6,
  },
  loaderView: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
});
