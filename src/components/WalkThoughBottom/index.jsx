import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppStyles, Colors, Images} from '../../theme';
import styles from './styles';

export default function WalkthoughBottom(props) {
  const {onPress, step} = props || {};
  return (
    <View style={styles.mainView}>
      <View style={styles.stepView}>
        <View style={[styles.dotView, step == 1 && styles.selectedDotLine]} />
        <View
          style={[
            styles.dotView,
            step == 2 && styles.selectedDotLine,
            step == 2 && styles?.marginLeft,
          ]}
        />
        <View
          style={[
            styles.dotView,
            step == 3 && styles.selectedDotLine,
            step == 3 && styles?.marginLeft,
          ]}
        />
      </View>

      <TouchableOpacity onPress={onPress} style={styles.nextBtn}>
        <Image
          source={Images.ArrowRight}
          style={{maxHeight: 34, maxWidth: 34}}
        />
      </TouchableOpacity>
    </View>
  );
}
