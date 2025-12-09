import {View, Image} from 'react-native';
import React, {useState} from 'react';
import DatePickerRN from 'react-native-date-picker';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import Text from '../Text';
import ButtonView from '../ButtonView';
import moment from 'moment';
import _ from 'lodash';

const DatePicker = (props) => {
  const {leftIcon, value = null, setValue, error, setError} = props;

  const [open, setOpen] = useState(false);

  const toggleDatePicker = () => {
    setOpen(!open);
  };

  const handleDateConfirm = (date) => {
    setOpen(false);
    setValue?.(date);
    setError?.('');
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={leftIcon} style={styles?.leftIcon} />
        <Text
          color={value ? Colors.text?.primary : Colors.placeHolderColor}
          size={Fonts.size.xSmall}
          style={styles.text}>
          {value ? moment(value).format('DD-MM-YYYY') : 'Birthday'}
        </Text>
        <ButtonView onPress={toggleDatePicker} style={{marginLeft: 'auto'}}>
          <Image source={Images.DatePickerIcon} style={styles?.rightIcon} />
        </ButtonView>
      </View>

      <DatePickerRN
        modal
        mode="date"
        open={open}
        date={value ?? new Date()}
        maximumDate={new Date()}
        onConfirm={handleDateConfirm}
        onCancel={toggleDatePicker}
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
    </>
  );
};

export default DatePicker;
