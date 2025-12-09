import {
  FlatList,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {
  ButtonView,
  CarouselListArrow,
  CustomHeaderNutrition,
  PieChartFullCircle,
  Text,
} from '../../components';
import {AppStyles, Colors, Fonts} from '../../theme';
import util from '../../util';
import PieChart from 'react-native-pie-chart';
import * as Progress from 'react-native-progress';
import {CaloriesData, MacrosData} from '../../constants';
import {useNavigation} from '@react-navigation/native';

export default function NutritionGraphScreen() {
  const [selectedTab, setSelectedTab] = useState('Calories');
  const refFlatlist = useRef(null);

  const WeeksData = util.getCurrentMonthWeeks();
  const widthAndHeight = 137;
  const series = [400, 321, 127];
  const sliceColor = ['#FF294F', '#FF9500', '#0D82FF'];
  const navigate = useNavigation();

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

  //Calories

  const renderHeader = () => {
    return (
      <View style={styles.nutritionHeader}>
        <ButtonView
          onPress={() => setSelectedTab('Calories')}
          style={[selectedTab == 'Calories' && styles.btnNutritionItem]}>
          <Text
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            color={
              selectedTab == 'Calories'
                ? Colors.background.primary
                : Colors.text.blueGray
            }
            style={{fontWeight: '500'}}>
            Calories
          </Text>
        </ButtonView>
        <ButtonView
          onPress={() => setSelectedTab('Nutrients')}
          style={[selectedTab == 'Nutrients' && styles.btnNutritionItem]}>
          <Text
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            color={
              selectedTab == 'Nutrients'
                ? Colors.background.primary
                : Colors.text.blueGray
            }
            style={{fontWeight: '500'}}>
            Nutrients
          </Text>
        </ButtonView>
        <ButtonView
          onPress={() => setSelectedTab('Macros')}
          style={[selectedTab == 'Macros' && styles.btnNutritionItem]}>
          <Text
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            color={
              selectedTab == 'Macros'
                ? Colors.background.primary
                : Colors.text.blueGray
            }
            style={{fontWeight: '500'}}>
            Macros
          </Text>
        </ButtonView>
      </View>
    );
  };

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

  const renderCaloreisRow = (name, value) => {
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

  const renderTableCalories = () => {
    return (
      <View style={styles.CaloriesTable}>
        {renderCaloreisRow('Total Calories', '450')}
        {renderSeparator()}
        {renderCaloreisRow('Net Calories', '450')}
        {renderSeparator()}
        {renderCaloreisRow('Goals', '2,620')}
        {renderSeparator()}
        <Text
          size={12}
          type={Fonts.type.base}
          style={{fontWeight: '500', lineHeight: 18, marginTop: 10}}
          color={Colors.text.black}>
          Suggestions
        </Text>
        {renderCaloreisRow('Rice Bowl (example)', '2,620')}
        {renderSeparator()}
        {renderCaloreisRow('Tomato Soup (example)', '2,620')}
      </View>
    );
  };

  //Nutrients

  const renderNutritentsTable = () => {
    return (
      <View style={styles.NutritentsTable}>
        <View style={[AppStyles.flexRow, AppStyles.baseAlign]}>
          <View style={AppStyles.flexHalf} />
          <View
            style={[
              AppStyles.flexHalf,
              AppStyles.flexRow,
              AppStyles.spaceBetween,
            ]}>
            <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
              Total
            </Text>
            <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
              Goals
            </Text>
            <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
              Left
            </Text>
          </View>
        </View>

        <FlatList
          data={CaloriesData}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate('nutritentIndividual', {
                    title: item.title,
                  })
                }>
                <View
                  style={[
                    AppStyles.flexRow,
                    AppStyles.baseAlign,
                    AppStyles.mTop10,
                  ]}>
                  <View style={AppStyles.flexHalf}>
                    <Text
                      size={12}
                      type={Fonts.type.base}
                      style={{fontWeight: '500'}}>
                      {item.title}
                    </Text>
                  </View>
                  <View
                    style={[
                      AppStyles.flexHalf,
                      AppStyles.flexRow,
                      AppStyles.spaceBetween,
                    ]}>
                    <Text
                      size={12}
                      type={Fonts.type.base}
                      color={Colors.text.blueGray}
                      style={{fontWeight: '500', marginLeft: 10}}>
                      {item.total}
                    </Text>
                    <Text
                      size={12}
                      type={Fonts.type.base}
                      color={Colors.text.blueGray}
                      style={{fontWeight: '500'}}>
                      {item.value}
                    </Text>
                    <Text
                      size={12}
                      type={Fonts.type.base}
                      color={Colors.text.blueGray}
                      style={{fontWeight: '500', marginRight: 10}}>
                      {item.left}
                    </Text>
                  </View>
                </View>
                {renderBarProgress(item.progress)}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  const renderBarProgress = (value) => (
    <Progress.Bar
      progress={value}
      width={Dimensions.get('window').width - 35}
      style={{width: '100%', marginTop: 10}}
      color={Colors.background.primary}
      borderWidth={0}
      unfilledColor={'#F4F3F7'}
    />
  );

  //Macros

  const renderMacrosRow = () => {
    return (
      <View style={{flex: 1}}>
        <View style={[AppStyles.flexRow, AppStyles.baseAlign]}>
          <View style={{flex: 0.7}} />
          <View
            style={[AppStyles.flexRow, AppStyles.spaceBetween, {flex: 0.3}]}>
            <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
              Total
            </Text>
            <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
              Goal
            </Text>
          </View>
        </View>

        <FlatList
          data={MacrosData}
          renderItem={({item}) => {
            return (
              <View>
                <View
                  style={[
                    AppStyles.flexRow,
                    AppStyles.baseAlign,
                    AppStyles.mTop10,
                  ]}>
                  <View style={{flex: 0.7, flexDirection: 'row'}}>
                    <View
                      style={{
                        height: 14,
                        width: 14,
                        borderRadius: 7,
                        backgroundColor: Colors.background.primary,
                        marginRight: 5,
                      }}
                    />
                    <Text
                      size={12}
                      type={Fonts.type.base}
                      style={{fontWeight: '500'}}>
                      {item.title}
                    </Text>
                  </View>
                  <View
                    style={[
                      AppStyles.flexHalf,
                      AppStyles.flexRow,
                      AppStyles.spaceBetween,
                      {
                        flex: 0.3,
                      },
                    ]}>
                    <Text
                      size={12}
                      type={Fonts.type.base}
                      color={Colors.text.blueGray}
                      style={{fontWeight: '500'}}>
                      {item.total}
                    </Text>
                    <Text
                      size={12}
                      type={Fonts.type.base}
                      color={Colors.text.blueGray}
                      style={{fontWeight: '500'}}>
                      {item.value}
                    </Text>
                  </View>
                </View>
                {renderSeparator()}
              </View>
            );
          }}
        />
      </View>
    );
  };

  const renderMacrosGraph = () => {
    return (
      <View style={styles.MacrosView}>
        <PieChartFullCircle />
        {renderMacrosRow()}
        <View style={{flex: 1, width: '100%'}}>
          <Text
            size={12}
            type={Fonts.type.base}
            style={{fontWeight: '500', lineHeight: 18, marginTop: 10}}
            color={Colors.text.black}>
            Suggestions
          </Text>
          {renderCaloreisRow('Rice Bowl (example)', '2,620')}
          {renderSeparator()}
          {renderCaloreisRow('Tomato Soup (example)', '2,620')}
          {renderSeparator()}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={'Nutrition'} />
      {renderHeader()}
      <ScrollView
        contentContainerStyle={AppStyles.pBottom10}
        showsVerticalScrollIndicator={false}>
        {renderWeek()}
        {selectedTab == 'Calories' && (
          <>
            {renderGraph()}
            {renderTableCalories()}
          </>
        )}
        {selectedTab == 'Nutrients' && <>{renderNutritentsTable()}</>}
        {selectedTab == 'Macros' && <>{renderMacrosGraph()}</>}
      </ScrollView>
    </View>
  );
}
