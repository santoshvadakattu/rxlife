import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {
  Button,
  CustomHeaderNutrition,
  SeperaterView,
  Text,
} from '../../components';
import {Colors, Fonts} from '../../theme';
import {useNavigation} from '@react-navigation/native';

export default function CalorieMacroGoals() {
  const navigate = useNavigation();

  const renderMealRow = (name, value) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
            {name}
          </Text>
          <Text
            size={12}
            type={Fonts.type.base}
            style={{fontWeight: '500'}}
            color={Colors.black}>
            {value}
          </Text>
        </View>
      </>
    );
  };

  const renderSeparator = () => (
    <View style={{backgroundColor: '#F4F3F7', height: 2, marginTop: 10}} />
  );

  const rerderSaveBtn = () => {
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

  const renderCalorieMacroGoals = () => {
    return (
      <View style={styles.MacroGoals}>
        <Text size={12} style={{fontWeight: '500', marginTop: 10}}>
          Calorie & Macro Goals
        </Text>
        {renderMealRow('Calories', '2000')}
        {renderSeparator()}
        {renderMealRow('Carbohydrates 285g', '50%')}
        {renderSeparator()}
        {renderMealRow('Protein 144g', '20%')}
        {renderSeparator()}
        {renderMealRow('Fat 144g', '30%')}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title="Calorie & Macro Goals" />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        {renderCalorieMacroGoals()}
      </View>
      {rerderSaveBtn()}
    </View>
  );
}
