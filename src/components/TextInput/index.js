// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {TextInput as RNTextInput, View, Image} from 'react-native';
import {Text, ButtonView} from '../';
import {Colors, AppStyles, Images, Fonts} from '../../theme';
import styles from './styles';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
export default class TextInput extends React.PureComponent {
  static propTypes = {
    label: ViewPropTypes.style,
    error: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    onPress: PropTypes.func,
    multiline: PropTypes.bool,
  };

  static defaultProps = {
    error: '',
    label: '',
    containerStyle: {},
    onPress: null,
    multiline: false,
    leftIcon: null,
    leftIconStyle: {},
    placeholder: '',
  };

  focus() {
    this.myRef.focus();
  }

  blur() {
    this.myRef.blur();
  }

  render() {
    const {
      label,
      error,
      containerStyle,
      onPress,
      multiline,
      leftIcon,
      leftIconWrapperStyle,
      leftIconStyle,
      placeholder,
      rightIcon,
      rightText,
      ...rest
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text color={Colors.grey2} style={AppStyles.mTop10}>
            {label}
          </Text>
        )}

        <View>
          {leftIcon && (
            <View
              style={[
                styles?.leftIconWrapper,
                leftIconWrapperStyle && leftIconWrapperStyle,
              ]}>
              <Image
                source={leftIcon}
                style={[styles.leftIcon, leftIconStyle && leftIconStyle]}
              />
            </View>
          )}
          <RNTextInput
            ref={(ref) => {
              this.myRef = ref;
            }}
            style={[
              styles.input,
              rightIcon && {paddingRight: 50},
              multiline ? styles.multilineInput : {},
              {
                borderColor: this?.state?.isFocus
                  ? Colors.borders.inputFocused
                  : Colors.borders.input,
              },
            ]}
            blurOnSubmit={false}
            selectionColor={Colors.blue}
            multiline={multiline}
            placeholder={placeholder}
            onFocus={() => {
              this.setState({isFocus: true});
            }}
            onBlur={() => {
              this.setState({isFocus: false});
            }}
            {...rest}
          />
          {rightText && (
            <Text
              style={styles.rightIconWrapper}
              size={Fonts.size.xSmall}
              color={Colors.text.Gray62}>
              {rightText}
            </Text>
          )}
          {rightIcon && (
            <ButtonView onPress={onPress} style={styles.rightIconWrapper}>
              <Image source={rightIcon} style={styles.rightIcon} />
            </ButtonView>
          )}
        </View>

        {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
          <Text
            type="medium"
            size="xxxSmall"
            color={Colors.red}
            style={[AppStyles.mTop5, AppStyles.mBottom5]}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}
