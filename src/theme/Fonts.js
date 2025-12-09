// @flow

import {Platform} from 'react-native';

const type = {
  /* base: "ParalucentText-Book",
  medium: "Paralucent-Medium" */
  base: Platform.select({
    ios: 'Poppins-Regular',
    android: 'Poppins-Regular',
  }),
  bold: Platform.select({
    ios: 'Poppins-Bold',
    android: 'Poppins-Bold',
  }),
  medium: Platform.select({
    ios: 'Poppins-Medium',
    android: 'Poppins-Medium',
  }),
  semiBold: Platform.select({
    ios: 'Poppins-SemiBold',
    android: 'Poppins-SemiBold',
  }),
  extraBold: Platform.select({
    ios: 'AbhayaLibre-ExtraBold',
    android: 'AbhayaLibre-ExtraBold',
  }),
};

// Metrics.generatedFontSize(ios, android)

const size = {
  xxxxxSmall: 10,
  xxxxSmall: 11,
  xxxSmall: 12,
  xxSmall: 13,
  xSmall: 14,
  small: 15,
  xNormal: 16,
  normal: 17,
  medium: 18,
  large: 20,
  large21: 21,
  xLarge: 24,
  xxLarge: 30,
  xxxLarge: 36,
  xxxxLarge: 40,
};

export default {
  type,
  size,
};
