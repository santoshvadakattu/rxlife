// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    paddingHorizontal: 20,
    // marginBottom: 20,
  },
  connectWatchView: {
    height: 89,
    backgroundColor: Colors.background.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 10,
  },
  connectInnerView: {
    marginLeft: 16,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  appleView: {
    width: 45,
    height: 45,
    borderRadius: 6,
    backgroundColor: Colors.blue4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectWatchViewMain: {alignSelf: 'flex-start', width: '100%', marginTop: 7},
  activitiesView: {
    width: '100%',
    padding: 20,
    // height: 117,
    borderRadius: 12,
    marginTop: 13,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 2,
  },
  separaterView: {backgroundColor: '#CDCDCD', height: 18, width: 1},
  ActivitiesItemView: {
    // marginTop: 30,
    marginHorizontal: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pizzeWrapper: {
    backgroundColor: Colors.white,
    padding: 13,
    borderRadius: 12,
    marginTop: 20,
  },
});
