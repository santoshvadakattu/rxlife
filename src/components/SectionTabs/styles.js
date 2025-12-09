import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewSelected: {
    // width: Dimensions.get('screen').width - 30,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(55, 55, 55, .05)',
    flexDirection: 'row',
    marginVertical: 15,
  },
  selectionView: {
    flex: 0.5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTxt: {fontSize: 14, fontWeight: '500'},
});
