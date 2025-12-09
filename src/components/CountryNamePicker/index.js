import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import CountryPicker, {
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import {Text, TextInput} from '..';
import {strings} from '../../constants';
import {Colors, Images} from '../../theme';
import styles from './styles';

export default function CountryNamePicker(props) {
  const {
    _value,
    setCountry,
    _error,
    placeholder = strings.SELECT_YOUR_COUNTRY,
    setSelectedCountryError,
  } = props || {};
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 2,
          borderColor: Colors.border,
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 12,
          gap: 10,
          height: 57,
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Image source={Images.locationIcon} />
          <Text size={14} color={_value ? Colors.black : Colors.text.blueGray}>
            {_value ? _value : 'Select Country'}
          </Text>
        </View>
        <Image source={Images.dropDrop} />
      </TouchableOpacity>
      {visible && (
        <CountryPicker
          visible={visible}
          theme={DEFAULT_THEME}
          withFilter={true}
          placeholder={''}
          {...{
            country: _value,
            onSelect: (country) => {
              setSelectedCountryError('');
              setCountry(country?.name ?? '');
            },
          }}
          onClose={() => {
            setVisible(false);
            setSelectedCountryError('');
          }}
          containerButtonStyle={styles.countryBtnPickerStyle}
        />
      )}
    </View>
  );
}
