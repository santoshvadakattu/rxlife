import {Dimensions, Image, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {BarChart} from 'react-native-chart-kit';
import {Colors, Fonts, Images} from '../../theme';
import Text from '../Text';

export default function BarChartComponnet(props) {
  const {value, title, unit, data, color, image, imageSytle} = props;

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    fillShadowGradientTo: color,
    fillShadowGradientFrom: color,
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
    color: () => Colors.white,
    labelColor: () => '#A3A3A3',
    strokeWidth: 0,
    barPercentage: 0.8,
    barRadius: 10,
    decimalPlaces: 0,
    propsForBackgroundLines: {
      stroke: '#F0F0F0',
      strokeDasharray: '',
    },
    propsForLabels: {
      fontSize: 8,
    },
  };
  return (
    <View style={styles.mainView}>
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
          }}>
          <Image
            source={image}
            style={[imageSytle, {marginTop: 3, resizeMode: 'contain'}]}
          />
        </View>
        <View style={{marginLeft: 8}}>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={Fonts.size.xSmall}
            style={{fontWeight: '500'}}>
            {title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              color={Colors.black2}
              type={Fonts.type.base}
              size={Fonts.size.large}
              style={{fontWeight: '600'}}>
              {typeof value != 'string' ? parseFloat(value?.toFixed(2)) : value}
            </Text>
            <Text
              color={Colors.text.Gray62}
              type={Fonts.type.base}
              size={Fonts.size.xSmall}
              style={{fontWeight: '400', marginLeft: 4}}>
              {unit}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <BarChart
          key={data?.datasets?.data?.[0]}
          style={styles.barChart}
          data={data}
          width={Dimensions.get('screen').width - 40}
          height={200}
          segments={2}
          withInnerLines={false}
          chartConfig={chartConfig}
          withHorizontalLabels={true}
          fromZero
          showBarTops={false}
        />
      </ScrollView>
    </View>
  );
}
