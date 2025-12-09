import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {CustomHeaderNutrition} from '../../components';

export default function MyFoodList() {
  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={'My Food'} />
    </View>
  );
}
