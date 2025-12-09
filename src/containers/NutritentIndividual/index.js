import {View} from 'react-native';
import React, {useRef} from 'react';
import {
  CarouselListArrow,
  CustomHeaderNutrition,
  PieChartFullCircle,
  Text,
} from '../../components';
import util from '../../util';
import styles from './styles';
import PieChart from 'react-native-pie-chart';
import {AppStyles, Colors, Fonts} from '../../theme';

export default function NutritentIndividual({route}) {
  const {title} = route.params;
  const refFlatlist = useRef(null);
  const WeeksData = util.getCurrentMonthWeeks();
  const widthAndHeight = 137;
  const series = [400, 321, 127];
  const sliceColor = ['#FF294F', '#FF9500', '#0D82FF'];

  function clickOnRight(index) {
    if (index !== 0) {
      refFlatlist.current.scrollToIndex({
        index: index - 1,
        animated: true,
      });
    }
  }

  function clickOnLeft(index) {
    if (WeeksData?.length - 1 !== index) {
      refFlatlist.current.scrollToIndex({
        index: index + 1,
        animated: true,
      });
    }
  }

  const renderWeek = () => {
    return (
      <CarouselListArrow
        data={WeeksData}
        clickOnLeft={clickOnLeft}
        clickOnRight={clickOnRight}
        refFlatlist={refFlatlist}
        styleView={styles.CarouseView}
        setCurrentIndex={() => {}}
      />
    );
  };

  const renderrPicaChart = () => (
    <PieChart
      widthAndHeight={widthAndHeight}
      series={series}
      sliceColor={sliceColor}
      coverFill={'#FFF'}
    />
  );

  const renderGraph = () => {
    return (
      <View style={styles.GraphView}>
        {/* {renderrPicaChart()} */}
        <PieChartFullCircle />
        <View style={{width: '100%', paddingHorizontal: 41, marginTop: 20}}>
          <View style={[AppStyles.flexRow, AppStyles.spaceBetween]}>
            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              <View
                style={[
                  styles.circleView,
                  {
                    backgroundColor: 'rgba(255, 41, 79, 1)',
                  },
                ]}
              />
              <View>
                <Text
                  type={Fonts.type.base}
                  size={Fonts.size.xxSmall}
                  style={{fontWeight: '500', lineHeight: 18}}>
                  Breakfast
                </Text>
                <Text
                  type={Fonts.type.base}
                  size={Fonts.size.xxxxSmall}
                  color={Colors.text.blueGray}
                  style={{fontWeight: '500', lineHeight: 15}}>
                  62% (320 cal)
                </Text>
              </View>
            </View>
            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              <View
                style={[
                  styles.circleView,
                  {
                    backgroundColor: '#0D82FF',
                  },
                ]}
              />
              <View>
                <Text
                  type={Fonts.type.base}
                  size={Fonts.size.xxSmall}
                  style={{fontWeight: '500', lineHeight: 18}}>
                  Lunch
                </Text>
                <Text
                  type={Fonts.type.base}
                  size={Fonts.size.xxxxSmall}
                  color={Colors.text.blueGray}
                  style={{fontWeight: '500', lineHeight: 15}}>
                  62% (320 cal)
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              AppStyles.flexRow,
              AppStyles.spaceBetween,
              AppStyles.mTop10,
            ]}>
            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              <View
                style={[
                  styles.circleView,
                  {
                    backgroundColor: '#395B82',
                  },
                ]}
              />
              <View>
                <Text
                  type={Fonts.type.base}
                  size={Fonts.size.xxSmall}
                  style={{fontWeight: '500', lineHeight: 18}}>
                  Dinner
                </Text>
                <Text
                  type={Fonts.type.base}
                  size={Fonts.size.xxxxSmall}
                  color={Colors.text.blueGray}
                  style={{fontWeight: '500', lineHeight: 15}}>
                  62% (320 cal)
                </Text>
              </View>
            </View>
            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              <View
                style={[
                  styles.circleView,
                  {
                    backgroundColor: '#61D85E',
                  },
                ]}
              />
              <View>
                <Text
                  type={Fonts.type.base}
                  size={Fonts.size.xxSmall}
                  style={{fontWeight: '500', lineHeight: 18}}>
                  Snacks
                </Text>
                <Text
                  type={Fonts.type.base}
                  size={Fonts.size.xxxxSmall}
                  color={Colors.text.blueGray}
                  style={{fontWeight: '500', lineHeight: 15}}>
                  62% (320 cal)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderNutritentItemRow = (name, value) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
            {name}
          </Text>
          <Text
            size={12}
            type={Fonts.type.base}
            style={{fontWeight: '500'}}
            color={Colors.text.black}>
            {value}
          </Text>
        </View>
      </>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderNetNutritent = () => {
    return (
      <View style={styles.nutritentItem}>
        {renderNutritentItemRow('Total Proteins', '400')}
        {renderSeparator()}
        {renderNutritentItemRow('Net Proteins', '400')}
        {renderSeparator()}
        {renderNutritentItemRow('Goals', '2,620')}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={title} />
      {renderWeek()}
      {renderGraph()}
      {renderNetNutritent()}
    </View>
  );
}
