import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PieChart from 'react-native-pie-chart';
import styles from './styles';
import Text from '../Text';
import {Fonts} from '../../theme';
import util from '../../util';

export default function NutritionGraph(props) {
  const {kcal, labelNutrients} = props || {};
  const widthAndHeight = 105;

  const sliceColor = ['#FF9500', '#0D82FF', '#FF294F'];
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protien, setProtien] = useState(0);
  const [calories, setCalories] = useState(0);

  let tempCarb = util.calculatePercentage(carbs * 4, calories) || 1;
  let tempFat = util.calculatePercentage(fat * 9, calories) || 1;
  let tempPro = util.calculatePercentage(protien * 4, calories) || 1;
  const series = [tempCarb, tempFat, tempPro];

  useEffect(() => {
    let calories = 0;

    // Check if labelNutrients is an object and contains the required keys
    if (labelNutrients && typeof labelNutrients === 'object') {
      const fat = parseFloat(labelNutrients.fat_total_g) || 0;
      const carbs = parseFloat(labelNutrients.carbohydrates_total_g) || 0;
      const protein = parseFloat(labelNutrients.protein_g) || 0;

      setFat(fat);
      setCarbs(carbs);
      setProtien(protein);

      // Calculate total calories
      calories = fat * 9 + carbs * 4 + protein * 4;
      setCalories(calories);
    } else {
      // Reset values if labelNutrients is not valid
      setFat(0);
      setCarbs(0);
      setProtien(0);
      setCalories(0);
    }
  }, [labelNutrients]);

  return (
    <View
      style={{
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{width: 105, height: 105}}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.75}
          coverFill={'#FFF'}
        />
        <View style={styles.txtKcal}>
          <Text
            size={Fonts.size.xLarge}
            type={Fonts.type.base}
            numberOfLines={1}
            style={styles.txtKcalValue}>
            {calories
              ? calories.toFixed(0)
              : kcal
              ? Number(kcal).toFixed(0)
              : 0 || ''}
          </Text>
          <Text size={Fonts.size.xSmall} type={Fonts.type.base}>
            kcal
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{alignItems: 'center', marginRight: 15}}>
          <Text
            size={Fonts.size.xxSmall}
            type={Fonts.type.base}
            color={'#FF9500'}
            style={{fontWeight: '600', lineHeight: 18}}>
            {util.calculatePercentage(carbs * 4, calories)} %
          </Text>
          <Text
            size={Fonts.size.large}
            type={Fonts.type.base}
            color={'#36405B'}
            numberOfLines={1}
            style={{
              fontWeight: '600',
              lineHeight: 30,
              fontWeight: '600',
              width: 50,
              textAlign: 'center',
            }}>
            {carbs}g
          </Text>
          <Text
            size={Fonts.size.xxSmall}
            type={Fonts.type.base}
            color={'#36405B'}
            style={{fontWeight: '600', lineHeight: 18}}>
            Carbs
          </Text>
        </View>
        <View style={{alignItems: 'center', marginRight: 15}}>
          <Text
            size={Fonts.size.xxSmall}
            type={Fonts.type.base}
            color={'#0D82FF'}
            style={{
              fontWeight: '600',
              lineHeight: 18,
            }}>
            {util.calculatePercentage(fat * 9, calories)}%
          </Text>
          <Text
            size={Fonts.size.large}
            type={Fonts.type.base}
            numberOfLines={1}
            color={'#36405B'}
            style={{
              fontWeight: '600',
              lineHeight: 30,
              width: 50,
              textAlign: 'center',
            }}>
            {fat}g
          </Text>
          <Text
            size={Fonts.size.xxSmall}
            type={Fonts.type.base}
            color={'#36405B'}
            style={{fontWeight: '600', lineHeight: 18}}>
            Fat
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            size={Fonts.size.xxSmall}
            type={Fonts.type.base}
            color={'#FF294F'}
            style={{fontWeight: '600', lineHeight: 18}}>
            {util.calculatePercentage(protien * 4, calories)}%
          </Text>
          <Text
            size={Fonts.size.large}
            type={Fonts.type.base}
            color={'#36405B'}
            numberOfLines={1}
            style={{
              fontWeight: '600',
              lineHeight: 30,
              width: 50,
              textAlign: 'center',
            }}>
            {protien}g
          </Text>
          <Text
            size={Fonts.size.xxSmall}
            type={Fonts.type.base}
            color={'#36405B'}
            style={{fontWeight: '600', lineHeight: 18}}>
            Protien
          </Text>
        </View>
      </View>
    </View>
  );
}
