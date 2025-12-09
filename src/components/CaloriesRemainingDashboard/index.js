import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import Text from '../Text';
import {Colors, Fonts} from '../../theme';
import SeperaterView from '../SeperaterView';
import NutritionGraph from '../NutritionGraph';
import {useSelector} from 'react-redux';
import util from '../../util';

export default function CaloriesRemainingDashboard() {
  const {userProfile} = useSelector((state) => state.user);
  const {goalCalories} = userProfile || {};
  const {DailyNutritionData} = useSelector((state) => state.nutritions);
  let cal = goalCalories ? goalCalories?.toFixed(0) : 0;
  const remaing =
    cal - util.getSumOFKcalfoodNutrients(DailyNutritionData)?.toFixed(0);

  const renderTargetAndValue = (target, value) => {
    return (
      <View>
        <Text size={10} type={Fonts.type.base} style={{fontWeight: '400'}}>
          {target}
        </Text>
        <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
          {value}
        </Text>
      </View>
    );
  };
  const renderSepareterLine = () => {
    return (
      <View
        style={{
          height: 18,
          width: 1,
          backgroundColor: 'rgba(54, 64, 91, 0.1)',
        }}
      />
    );
  };
  return (
    <View style={styles.mainView}>
      <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
        Calories Remaining
      </Text>
      <SeperaterView />

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {renderTargetAndValue(
          'Goal',
          goalCalories ? goalCalories?.toFixed(0) : 0,
        )}
        {renderSepareterLine()}
        {renderTargetAndValue(
          'Food',
          util.getSumOFKcalfoodNutrients(DailyNutritionData).toFixed(0) || 0,
        )}
        {renderSepareterLine()}
        {renderTargetAndValue('Exercise', '0')}
        {renderSepareterLine()}
        {renderTargetAndValue('Remaining', remaing)}
      </View>
      <NutritionGraph
        labelNutrients={util.getlabelNutrientsFromMyMealFood(
          util.getAllFoodFromNutritionData(DailyNutritionData),
        )}
      />
    </View>
  );
}
