// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    // height: 350,
    borderRadius: 12,
    backgroundColor: Colors.white,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    ...AppStyles.themeShadow,

    // Adjust the elevation as needed
  },
  btnStyle: {
    height: 47,
    borderRadius: 12,
    borderColor: Colors.background.primary,
    backgroundColor: Colors.white,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 10,
    marginTop: 0,
  },
  txtStyle: {
    fontSize: 14,
    fontFamily: Fonts.type.base,
    color: Colors.background.primary,
    textAlign: 'center',
    fontWeight: '500',
  },

  descContainer: {
    flex: 1,
    marginTop: 10,
    paddingVertical: 12,
  },
});
