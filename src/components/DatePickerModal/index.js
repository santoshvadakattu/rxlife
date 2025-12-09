import {View} from 'react-native';
import React from 'react';
import DatePickerRN from 'react-native-date-picker';

export default function DatePickerModal(props) {
  const {isDatePick, isMaximumDate, setIsDatePick, date, setDate} = props || {};
  return (
    <DatePickerRN
      modal
      mode="date"
      open={isDatePick}
      date={date}
      maximumDate={isMaximumDate && new Date()}
      onConfirm={(date) => {
        setDate(date);
        setIsDatePick(false);
      }}
      onCancel={() => setIsDatePick(false)}
    />
  );
}
