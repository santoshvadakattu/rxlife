import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {
  Button,
  CustomHeaderNutrition,
  NutritionDropDown,
  NutritionInputText,
} from '../../components';
import {useNavigation} from '@react-navigation/native';

export default function CreateExercise({route}) {
  const {isEdit} = route.params || {};
  const [name, setname] = useState('');
  const [durations, setDurations] = useState('');
  const [calories, setCalories] = useState('');
  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition
        title={isEdit ? 'Edit Exercise ' : 'New Exercise '}
      />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <NutritionInputText
            placeholderText={'Name'}
            value={name}
            onChangeText={setname}
          />
          <NutritionDropDown
            dropArray={['Cardiovascular', 'Strength']}
            placeHolder={'Cardiovascular'}
            selectedValueFunc={() => {}}
          />
          <NutritionInputText
            placeholderText={'Durations'}
            value={durations}
            onChangeText={setDurations}
          />
          <NutritionInputText
            placeholderText={'Burn Calories'}
            value={calories}
            onChangeText={setCalories}
          />
        </View>
        <Button
          title="Save"
          onPress={() => {
            navigate.pop(2);
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
    </View>
  );
}
