import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  ViewContainer: {
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: 'white',
    marginTop: 10,
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caloriesImage: {height: 32, width: 53},
  dropDownIconView: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dropDownIcon: {height: 12, width: 8, marginRight: 10},
  inPutStyle: {
    height: 57,
    borderRadius: 12,
    borderColor: '#0D82FF',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 15,
  },
  intensityImage: {
    height: 45,
    width: 45,
  },
  stepsImage: {
    width: 48,
    height: 36,
  },
});
