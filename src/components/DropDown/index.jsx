import {Image, View} from 'react-native';
import React from 'react';
import Text from '../Text';
import styles from './styles';
import {Dropdown} from 'react-native-element-dropdown';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import ButtonView from '../ButtonView';
import _ from 'lodash';

const DropDown = (props) => {
  const {
    data,
    value,
    setValue,
    placeholder,
    leftIcon,
    rightIcon,
    error,
    setError,
  } = props;

  const renderItem = (item) => {
    return (
      <View
        style={styles.item}
        type={item?.value == value ? Fonts.type.medium : Fonts.type.base}>
        <Text size={Fonts.size.xSmall}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.txtLogin}>
      <Dropdown
        style={[styles.inputViewStyles]}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        placeholderStyle={[styles.placeholderStyle]}
        value={value}
        // inverted={true}
        dropdownPosition="bottom"
        onChange={(item) => {
          setValue(item);
          setError?.('');
        }}
        renderLeftIcon={() => (
          <Image
            style={[
              styles.icon,
              {
                width: 20,
                height: 20,
              },
            ]}
            source={leftIcon}
          />
        )}
        renderRightIcon={() => (
          <Image
            style={[
              styles.icon,
              {
                height: 26,
                width: 12,
                objectFit: 'contain',
              },
            ]}
            source={rightIcon}
          />
        )}
        renderItem={renderItem}
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
    </View>
  );
};

export default DropDown;
