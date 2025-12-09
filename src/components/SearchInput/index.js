import {Image, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors, Images} from '../../theme';
import TextInput from '../TextInput';

export default function SearchInput(props) {
  const {text, setText, placeholder} = props;
  return (
    <View style={styles.container}>
      <Image source={Images.Search} style={{width: 20, height: 20}} />
      <TextInput
        value={text}
        containerStyle={styles.inputText}
        style={styles.inputStyle}
        placeholder={placeholder || 'Search here...'}
        placeholderTextColor={Colors.text.Gray62}
        onChangeText={(val) => {
          setText(val);
        }}
      />
    </View>
  );
}
