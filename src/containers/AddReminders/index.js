import {View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {
  Button,
  CustomHeaderNutrition,
  DatePickerModal,
  KeyboardAwareScrollViewComponent,
  NutritionDropDown,
  NutritionInputText,
  Text,
} from '../../components';
import {AppStyles, Colors, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {strings} from '../../constants';

export default function AddReminders({route}) {
  const {isEdit} = route.params || {};
  const [date, setDate] = useState('');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [dateError, setDateError] = useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const navigate = useNavigation();

  function validation() {
    let isValid = true;
    if (!title) {
      setTitleError(strings.REQUIRED_FIELD);
      isValid = false;
    }
    if (!date) {
      setDateError(strings.REQUIRED_FIELD);
      isValid = false;
    }
    return isValid;
  }

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition
        title={isEdit ? 'Edit Reminders' : 'Add Reminders'}
      />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <KeyboardAwareScrollViewComponent>
          <NutritionInputText
            placeholderText={'Title'}
            value={title}
            onChangeText={(value) => {
              setTitle(value);
              setTitleError('');
            }}
            error={titleError}
          />

          <TouchableOpacity
            style={{
              height: 57,
              alignItems: 'center',
              paddingHorizontal: 20,
              borderRadius: 12,
              borderColor: '#E5E5E5',
              borderWidth: 1,
              marginTop: 10,
              flexDirection: 'row',
            }}
            onPress={() => setIsDateOpen(true)}>
            <Image
              style={{width: 20, height: 20}}
              source={Images.DatePickerIcon}
            />
            <Text
              size={12}
              color={date ? Colors.black : Colors.text.blueGray}
              style={{marginLeft: 10}}>
              {date ? moment(date).format('DD-MMM-YYYY') : 'Date'}
            </Text>
          </TouchableOpacity>
          {dateError && (
            <Text
              type="medium"
              size="xxxSmall"
              color={Colors.red}
              style={[AppStyles.mTop5, AppStyles.mBottom5]}>
              {dateError}
            </Text>
          )}
        </KeyboardAwareScrollViewComponent>
        <Button
          title="Save"
          onPress={() => {
            if (validation()) navigate.goBack();
          }}
          style={{
            height: 45,
            padding: 0,
            marginTop: 0,
            borderRadius: 6,
            marginBottom: 30,
          }}
        />
      </View>
      {isDateOpen && (
        <DatePickerModal
          isDatePick={isDateOpen}
          setIsDatePick={setIsDateOpen}
          date={new Date()}
          setDate={setDate}
        />
      )}
    </View>
  );
}
