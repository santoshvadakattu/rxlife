import {View} from 'react-native';
import React from 'react';
import Text from '../Text';
import styles from './styles';
import {AppStyles, Colors, Fonts} from '../../theme';

const PointDetail = (props) => {
  const {data} = props;
  return (
    <View style={styles.container}>
      <Text
        size={Fonts.size.xSmall}
        color={Colors.text.primary}
        numberOfLines={1}
        style={AppStyles.flex}>
        {data?.title}
      </Text>

      <Text
        size={Fonts.size.xxxSmall}
        color={`rgba(55, 55, 55, .5)`}
        // style={AppStyles.flex}
      >
        {data?.points < 10 ? `0${data?.points}` : data?.points} points
      </Text>
    </View>
  );
};

export default PointDetail;
