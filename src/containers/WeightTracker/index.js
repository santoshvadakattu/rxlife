import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {CustomNavbar, SeperaterView, Button, Text} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {LineChart} from 'react-native-chart-kit';
import {SCREENS} from '../../constants';
import {currentMonthWeeks} from '../../util';
export default function WeightTracker() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTrack, setSelectedTrack] = useState('Month');
  const [selectDropdown, setSelectDropdown] = useState('Weight');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentYear = currentDate.getFullYear();
  const [currentWeek, setCurrentWeek] = useState(1);
  const currentMonth = currentDate.getMonth();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weeksArray = currentMonthWeeks(currentYear, currentMonth);
  const navigate = useNavigation();

  const renderCustomerrNavbar = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title={'Tracker'}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
        rightBtnPressSecond={() => {}}
        rightBtnPress={() => {}}
      />
    );
  }, []);

  const data = {
    labels: ['4/03', '11/03', '18/03', '25/03', '1/04', '4/04'],
    datasets: [
      {
        data: [63, 65, 67, 69, 71, 69],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: Colors.white,
    backgroundGradientTo: Colors.white,
    strokeWidth: 2,
    color: () => 'rgba(97, 216, 94, 1)',
    propsForDots: {
      backgroundColor: '#4cabce',
      radius: 4,
    },
    labelColor: () => Colors.black,
    decimalPlaces: 0,
    propsForDots: {
      r: '8',
      strokeWidth: '2',
      color: Colors.background.primary,
      backgroundColor: Colors.background.primary,
      stroke: Colors.background.white,
    },
  };

  function clickOnLeftArrow() {
    if (selectedTrack == 'Weekly') {
      const newDate = new Date(
        currentYear,
        currentMonth,
        currentDate.getDate() - 7,
      );
      setCurrentDate(newDate);
      const newWeek = Math.max(1, currentWeek - 1); // Ensure week stays within valid range
      setCurrentWeek(newWeek);
    } else {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  }

  function clickOnRightArrow() {
    if (selectedTrack == 'Weekly') {
      if (currentIndex < 5) {
        const totalWeeks = currentMonthWeeks(currentYear, currentMonth);
        const newDate = new Date(
          currentYear,
          currentMonth,
          currentDate.getDate() + 7,
        ); // Go forward one week
        setCurrentDate(newDate);
        const newWeek = Math.min(totalWeeks, currentWeek + 1); // Ensure week stays within valid range
        setCurrentWeek(newWeek);
      }
    } else {
      if (currentIndex < 11) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  }

  const renderDropDownWeight = () => {
    return (
      <View style={styles.weightView}>
        <TouchableOpacity
          onPress={() => setOpenDropdown(!openDropdown)}
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            height: 50,
            alignItems: 'center',
          }}>
          <Text
            size={Fonts.size.xSmall}
            type={Fonts.type.base}
            color={Colors.black}
            style={{fontsWeight: '500'}}>
            {selectDropdown}
          </Text>
          <Image
            style={{transform: [{rotate: openDropdown ? '180deg' : '0deg'}]}}
            source={Images.dropDrop}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderGraph = () => {
    return (
      <View style={styles.graphView}>
        <View
          style={{
            height: 50,
            borderRadius: 12,
            backgroundColor: 'rgba(13, 130, 255, 0.1)',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={[
              {
                flex: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
              },
              selectedTrack == 'Weekly' && styles.selectedTrack,
            ]}
            onPress={() => {
              setCurrentIndex(0);
              setSelectedTrack('Weekly');
            }}>
            <Text
              size={Fonts.size.xSmall}
              type={Fonts.type.base}
              style={[
                {fontsWeight: '500'},
                selectedTrack == 'Weekly' && styles.selectedTxt,
              ]}>
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                flex: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
              },
              selectedTrack == 'Month' && styles.selectedTrack,
            ]}
            onPress={() => {
              setCurrentIndex(0);
              setSelectedTrack('Month');
            }}>
            <Text
              size={Fonts.size.xSmall}
              type={Fonts.type.base}
              style={[
                {fontsWeight: '500'},
                selectedTrack == 'Month' && styles.selectedTxt,
              ]}>
              Month
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginVertical: 10,
            alignItems: 'center',
          }}>
          <Text size={12} type={Fonts.type.bold} style={{fontWeight: '500'}}>
            {selectedTrack == 'Weekly'
              ? `Week ${currentWeek}`
              : months[currentIndex]}
          </Text>
          <View style={{flexDirection: 'row', gap: 3}}>
            <TouchableOpacity
              onPress={clickOnLeftArrow}
              style={{
                width: 24,
                height: 24,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Image style={{width: 9, height: 14}} source={Images.LeftArrow} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={clickOnRightArrow}
              style={{
                width: 24,
                height: 24,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: 9,
                  height: 14,
                  transform: [{rotate: '180deg'}],
                }}
                source={Images.LeftArrow}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={data}
            width={Dimensions.get('screen').width - 50}
            height={Dimensions.get('screen').height / 4.5}
            chartConfig={chartConfig}
            style={{
              marginVertical: 8,
              backgroundColor: '#fff',
              alignItems: 'flex-end',
              marginLeft: -15,
            }}
            withShadow={false}
            withInnerLines={false}
          />
        </ScrollView>
      </View>
    );
  };

  const renderrEntriesItem = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Image style={{width: 38, height: 38}} source={Images.dummyImage} />

          <View>
            <Text
              size={10}
              color={Colors.text.blueGray}
              type={Fonts.type.base}
              style={{fontWeight: '400'}}>
              65kg
            </Text>
            <Text
              size={12}
              color={Colors.black}
              type={Fonts.type.base}
              style={{fontWeight: '400', lineHeight: 21}}>
              Tuesday, 02 apr 2024
            </Text>
          </View>
        </View>
        <SeperaterView />
      </View>
    );
  };

  const renderEntries = () => {
    return (
      <View style={styles.entriesView}>
        <Text
          size={16}
          color={Colors.black}
          type={Fonts.type.base}
          style={{fontWeight: '700'}}>
          Entries
        </Text>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          renderItem={() => renderrEntriesItem()}
        />
      </View>
    );
  };

  const renderBtn = () => {
    return (
      <Button
        title="Add New Entry"
        onPress={() => {
          navigate.navigate(SCREENS.HOME.addWeight, {
            addTracker: selectDropdown,
          });
        }}
        style={styles.btnStyle}
        textStyle={styles.btnText}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderCustomerrNavbar}
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{flex: 1}}>
          {renderDropDownWeight()}
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}>
            {renderGraph()}
            {renderEntries()}
          </View>
        </View>
        {renderBtn()}
        {openDropdown && (
          <FlatList
            data={['Weight', 'Body Fat', 'BMI', 'Weist', 'Chest', 'Arm', 'Hip']}
            style={{
              position: 'absolute',
              right: 0,
              left: 0,
              top: 70,
              zIndex: 1,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              shadowColor: Colors.black,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 1,
              elevation: 2,
              borderBottomRightRadius: 12,
              borderBottomLeftRadius: 12,
            }}
            renderItem={({item}) => {
              if (selectDropdown == item) {
                return;
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    setOpenDropdown(false);
                    setSelectDropdown(item);
                  }}
                  style={{height: 50}}>
                  <View style={styles.separator} />
                  <Text
                    size={14}
                    color={Colors.black}
                    type={Fonts.type.base}
                    style={{fontWeight: '400', marginTop: 15}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}
