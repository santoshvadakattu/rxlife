import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import Text from '../Text';
import {Colors} from '../../theme';

const SecondOption = ({title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.lineView} />
      <Text size="xSmall" type="base" color={Colors.black2}>
        {title}
      </Text>
      <View style={styles.lineView} />
    </View>
  );
};

export default SecondOption;
