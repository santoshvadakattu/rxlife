import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  dropdown: {
    // height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    // paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  txtLogin: {
    width: '100%',
    marginTop: 10,
  },
  labelStyle: {
    color: Colors.text.primary,
  },
  placeholderStyle: {
    fontSize: Fonts.size.xSmall,
    color: Colors.placeHolderColor,
    marginLeft: 11,
  },
  selectedTextStyle: {
    fontSize: Fonts.size.xSmall,
    marginLeft: 15,
    color: Colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: Fonts.size.xSmall,
  },
  inputViewStyles: {
    borderColor: Colors.borders.input,
    borderWidth: 1,
    width: '100%',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  item: {
    padding: 10,
  },
});
