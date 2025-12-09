// @flow
import {StatusBar, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
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
  GraphView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 12,
    padding: 15,
  },
  circleView: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 7.5,
  },
  separator: {
    backgroundColor: '#F4F3F7',
    height: 2,
    marginTop: 15,
  },
  nutritentItem: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 12,
    padding: 15,
  },
});
