import _ from 'lodash';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {AppStyles, Colors, Images} from '../../theme';
import Text from '../Text';

export default function NutritionInputText(props) {
  const {
    value,
    onChangeText,
    containStyle,
    disable,
    placeholderText,
    rightImage,
    rightImageSource,
    onPress,
    error,
    inputRef,
    inputOnSubmitEditing,
    mainViewStyle,
    ...rest
  } = props;

  const [isFocus, setIsFocus] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (disable) {
          onPress();
        }
      }}
      style={[{marginTop: 15}, mainViewStyle]}>
      <TextInput
        ref={inputRef}
        placeholder={placeholderText}
        value={value}
        editable={!disable}
        onChangeText={onChangeText}
        placeholderTextColor={'rgba(55, 55, 55, 0.2)'}
        style={[
          styles.inputViewStyle,
          {...containStyle},
          {
            borderColor: isFocus
              ? Colors.borders.inputFocused
              : Colors.borders.input,
          },
        ]}
        cursorColor={Colors.black}
        selectionColor={Colors.black}
        onSubmitEditing={inputOnSubmitEditing}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        {...rest}
      />
      {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
        <Text
          type="medium"
          size="xxxSmall"
          color={Colors.red}
          style={[AppStyles.mTop5, AppStyles.mBottom5]}>
          {error}
        </Text>
      )}
      {rightImage && (
        <Image
          source={rightImageSource}
          style={{
            position: 'absolute',
            right: 20,
            top: 22,
          }}
        />
      )}
    </TouchableOpacity>
  );
}
