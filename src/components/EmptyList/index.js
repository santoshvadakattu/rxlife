import {Image, View} from 'react-native';
import React from 'react';
import {Fonts, Images} from '../../theme';
import Text from '../Text';
import styles from './styles';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.Empty} style={styles.image} />

      <Text size={Fonts.size.medium} type="semiBold" style={styles.text}>
        No Data Found
      </Text>
    </View>
  );
};

export default EmptyList;
