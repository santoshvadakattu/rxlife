import {Dimensions, Image, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {BarChart} from 'react-native-chart-kit';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import Text from '../Text';

export default function StatisticsBarChart(props) {
  const {title, des, color, data} = props;

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
            marginLeft: 8,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={[
              AppStyles.flex,
              AppStyles.alignItemsCenter,
              AppStyles.flexRow,
            ]}>
            <Text
              color={Colors.black2}
              type={Fonts.type.base}
              size={Fonts.size.xSmall}
              style={{fontWeight: '500'}}>
              {title}
            </Text>
            <Image
              source={Images.PointLogo}
              style={{width: 33, height: 33, marginLeft: 5}}
            />
          </View>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={Fonts.size.xSmall}
            style={{fontWeight: '500'}}>
            {des} pts
          </Text>
        </View>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <BarChart
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
