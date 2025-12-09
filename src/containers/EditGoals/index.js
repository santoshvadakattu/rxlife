import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {
  Button,
  CustomHeaderNutrition,
  NutritionInputText,
  SeperaterView,
  Text,
} from '../../components';
import {Colors, Fonts} from '../../theme';
import {useNavigation} from '@react-navigation/native';

export default function EditGoals() {
  const [startingWeight, setStartingWeight] = useState('65 ');
  const [currentWeight, setCurrentWeight] = useState('65');
  const [targetedWeight, setTargetedWeight] = useState('70');
  const [weeklyGoal, setWeeklyGoal] = useState('Gain 0.25 kg per week');
  const navigate = useNavigation();

  const renderInputs = () => {
    return (
      <View style={{}}>
        <Text
          size={12}
          type={Fonts.type.base}
          color={Colors.black2}
          style={{
            fontWeight: '500',
          }}>
          Starting weight (kg)
        </Text>
        <NutritionInputText
          value={startingWeight}
          onChangeText={(text) => setStartingWeight(text)}
          keyboardType="numeric"
          mainViewStyle={{marginTop: 10}}
        />
        <Text
          size={12}
          type={Fonts.type.base}
          color={Colors.black2}
          style={{
            fontWeight: '500',
            marginTop: 10,
          }}>
          Current weight (kg)
        </Text>
        <NutritionInputText
          value={currentWeight}
          keyboardType="numeric"
          onChangeText={(text) => setCurrentWeight(text)}
          mainViewStyle={{marginTop: 10}}
        />
        <Text
          size={12}
          type={Fonts.type.base}
          color={Colors.black2}
          style={{
            fontWeight: '500',
            marginTop: 10,
          }}>
          Targeted Weight (kg)
        </Text>
        <NutritionInputText
          value={targetedWeight}
          onChangeText={(text) => setTargetedWeight(text)}
          keyboardType="numeric"
          mainViewStyle={{marginTop: 10}}
        />
        <Text
          size={12}
          type={Fonts.type.base}
          color={Colors.black2}
          style={{
            fontWeight: '500',
            marginTop: 10,
          }}>
          Weekly Goal
        </Text>
        <NutritionInputText
          value={weeklyGoal}
          onChangeText={(text) => setWeeklyGoal(text)}
          mainViewStyle={{marginTop: 10}}
        />
      </View>
    );
  };

  const renderActivelevel = () => {
    return (
      <View style={styles.activeView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text
            size={12}
            type={Fonts.type.base}
            color={Colors.black}
            style={{fontWeight: '500'}}>
            Activity Level
          </Text>
          <Text
            size={12}
            type={Fonts.type.base}
            color={Colors.black}
            style={{fontWeight: '500'}}>
            Active
          </Text>
        </View>
        <SeperaterView />
        <View style={{marginTop: 10}}>
          <Text
            size={12}
            type={Fonts.type.base}
            color={Colors.text.black}
            style={{fontWeight: '500'}}>
            Nutrition Goals{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigate.navigate('calorieMacroGoals');
            }}>
            <Text
              size={10}
              type={Fonts.type.base}
              color={Colors.text.blueGray}
              style={{fontWeight: '500', marginTop: 10}}>
              Customize your default or daily goals.
            </Text>
            <Text
              size={12}
              type={Fonts.type.base}
              color={Colors.text.black}
              style={{fontWeight: '500', lineHeight: 18}}>
              Calorie, Carbs, Proteins and Fat Goals{' '}
            </Text>
          </TouchableOpacity>
          <SeperaterView />
          <View style={{marginTop: 10}}>
            <Text
              size={12}
              type={Fonts.type.base}
              color={Colors.text.black}
              style={{fontWeight: '500', lineHeight: 18}}>
              Fitness Goals
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                size={12}
                type={Fonts.type.base}
                color={Colors.text.black}
                style={{fontWeight: '500', lineHeight: 18, marginTop: 10}}>
                Workouts/ Week
              </Text>
              <Text
                size={12}
                type={Fonts.type.base}
                color={Colors.text.black}
                style={{fontWeight: '500', lineHeight: 18, marginTop: 10}}>
                0
              </Text>
            </View>
            <SeperaterView />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                size={12}
                type={Fonts.type.base}
                color={Colors.text.black}
                style={{fontWeight: '500', lineHeight: 18, marginTop: 10}}>
                Minutes/Workout
              </Text>

              <Text
                size={12}
                type={Fonts.type.base}
                color={Colors.text.black}
                style={{fontWeight: '500', lineHeight: 18, marginTop: 10}}>
                0
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderSaveBtn = () => {
    return (
      <View style={{marginBottom: 20}}>
        <Button
          title="Save"
          onPress={() => {
            navigate.goBack();
          }}
          style={styles.btnStyle}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={'Edit Goals'} />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {renderInputs()}
        {renderActivelevel()}
        {renderSaveBtn()}
      </ScrollView>
    </View>
  );
}
