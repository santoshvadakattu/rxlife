import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors, Fonts} from '../../theme';
import Text from '../Text';

const index = (props) => {
  const {
    title1 = '',
    title3 = '',
    title2 = '',
    active,
    setActive = () => {},
  } = props;

  return (
    <View style={styles.viewSelected}>
      <TouchableOpacity
        onPress={() => setActive(title1)}
        style={[
          styles.selectionView,
          active == title1
            ? {backgroundColor: Colors.background.primary}
            : null,
        ]}>
        <Text
          color={Colors.text.primary}
          type={Fonts.type.base}
          style={[
            styles.selectedTxt,
            {color: active == title1 ? Colors.white : Colors.text.primary},
          ]}>
          {title1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActive(title2)}
        style={[
          styles.selectionView,
          active == title2
            ? {backgroundColor: Colors.background.primary}
            : null,
        ]}>
        <Text
          color={Colors.text.primary}
          type={Fonts.type.base}
          style={[
            styles.selectedTxt,
            {color: active == title2 ? Colors.white : Colors.text.primary},
          ]}>
          {title2}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActive(title3)}
        style={[
          styles.selectionView,
          active == title3
            ? {backgroundColor: Colors.background.primary}
            : null,
        ]}>
        <Text
          color={Colors.text.primary}
          type={Fonts.type.base}
          style={[
            styles.selectedTxt,
            {color: active == title3 ? Colors.white : Colors.text.primary},
          ]}>
          {title3}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
