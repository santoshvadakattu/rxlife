import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {
  Button,
  CustomHeaderNutrition,
  DatePickerModal,
  KeyboardAwareScrollViewComponent,
  NutritionInputText,
} from '../../components';
import {Colors, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

export default function AddNote({route}) {
  const {isEdit} = route.params || {};
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [note, setNote] = useState('');
  const navigate = useNavigation();

  function onChangeTitle(value) {
    setTitle(value);
  }

  function onChangeNote(value) {
    setNote(value);
  }

  const renderBtn = () => {
    return (
      <View style={{marginVertical: 10, marginBottom: 30}}>
        <Button
          title="Save"
          onPress={() => {
            navigate.goBack();
          }}
          style={[styles.btnStyle, {}]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={isEdit ? 'Edit Note' : 'Create a Note'} />
      <KeyboardAwareScrollViewComponent style={{flex: 1}}>
        <NutritionInputText
          value={title}
          onChangeText={onChangeTitle}
          placeholderText={'Title'}
        />

        <TouchableOpacity
          onPress={() => {
            setIsDateOpen(true);
          }}
          style={{
            height: 57,
            alignItems: 'center',
            paddingHorizontal: 20,
            borderRadius: 12,
            borderColor: '#E5E5E5',
            borderWidth: 1,
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text size={12} color={date ? Colors.black : Colors.text.blueGray}>
            {date ? moment(date).format('DD-MMM-YYYY') : 'Date'}
          </Text>
          <Image style={{width: 17, height: 19}} source={Images.calenderIcon} />
        </TouchableOpacity>
        <NutritionInputText
          value={note}
          onChangeText={onChangeNote}
          placeholderText={'Type Note'}
          containStyle={{
            height: 184,
            padding: 20,
            paddingTop: 20,
            textAlignVertical: 'top',
          }}
          multiline
        />
      </KeyboardAwareScrollViewComponent>
      {renderBtn()}
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
