import {ScrollView, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {BarChart, CarouselListArrow, CustomNavbar} from '../../components';
import {Colors, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {
  allActivityData,
  generateWeeksData,
  weeklyActivityData,
} from '../../constants';
import appleHealthKit from 'react-native-health';
import util from '../../util';

export default function ActivityAllChart() {
  const navigate = useNavigation();
  const refFlatlist = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(() => 0);

  const [WeeksData, setWeeksData] = useState([]);
  const [dataTotalSteps, setDataTotalSteps] = useState(() => []);
  const [datakcal, setDataKcal] = useState(() => []);

  const [selectedWeek, setSelectedWeek] = useState(() => null);

  useEffect(() => {
    const _WeeksData = util.getCurrentMonthWeeks();
    setWeeksData(_WeeksData);

    const currentDate = new Date();

    const currentWeekIndex = _WeeksData.findIndex((week) => {
      return currentDate >= week.startDate && currentDate <= week.endDate;
    });

    if (currentWeekIndex !== -1) {
      setSelectedWeek(_WeeksData[currentWeekIndex]);
      setTimeout(() => {
        refFlatlist.current.scrollToIndex({
          index: currentWeekIndex,
          animated: true,
        });
      }, 1500);
    } else {
      setSelectedWeek(_WeeksData[0]);
    }
  }, []);

  useEffect(() => {
    if (!selectedWeek) return;

    const options = {
      startDate: selectedWeek?.startDate?.toISOString(),
      endDate: selectedWeek?.endDate?.toISOString(),
    };

    let stepCountWeekly = [];
    for (
      var arr = [], dt = new Date(options.startDate);
      dt <= new Date(options.endDate);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    arr.map((item) => {
      const stepOption = {
        date: new Date(item).toISOString(),
      };

      appleHealthKit.getStepCount(stepOption, (callbackError, results) => {
        stepCountWeekly.push(results.value);
      });
    });
    setDataTotalSteps(stepCountWeekly);

    appleHealthKit.getActiveEnergyBurned(options, (callbackError, results) => {
      const result1 = util.addSameDateValue(results);
      const newArray = util.fillMissingDaysWithDataSleep(
        result1,
        options.startDate,
        options.endDate,
      );
      const values = newArray.map((item) => item.value);
      setDataKcal(values);
    });
  }, [selectedWeek]);

  function clickOnRight(index) {
    if (index !== 0) {
      setSelectedWeek(WeeksData[index - 1]);
      refFlatlist.current.scrollToIndex({
        index: index - 1,
        animated: true,
      });
    }
  }
  function clickOnLeft(index) {
    if (WeeksData.length - 1 !== index) {
      setSelectedWeek(WeeksData[index + 1]);
      refFlatlist.current.scrollToIndex({
        index: index + 1,
        animated: true,
      });
    }
  }
  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title={'Your Weekly Activity'}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
        rightBtnPressSecond={() => {}}
        rightBtnPress={() => {}}
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      {renderCustomNav}
      <View
        style={{
          flex: 1,
          // backgroundColor: 'rgba(255,255,255,0.5)',
          paddingHorizontal: 10,
          marginBottom: 40,
        }}>
        <CarouselListArrow
          data={WeeksData}
          clickOnLeft={clickOnLeft}
          clickOnRight={clickOnRight}
          refFlatlist={refFlatlist}
          styleView={styles.CarouseView}
          setCurrentIndex={setCurrentIndex}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <BarChart
            value={dataTotalSteps.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0,
            )}
            title={'Total Steps'}
            unit={'Steps'}
            color={'#FF294F'}
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: dataTotalSteps,
                },
              ],
            }}
            image={Images.StepsRunner}
            imageSytle={{width: 26, height: 26, tintColor: '#FF294F'}}
          />
          <BarChart
            value={0}
            title={'Distance'}
            unit={'km'}
            color={Colors.background.primary}
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: [],
                },
              ],
            }}
            image={Images.DistanceIcon}
            imageSytle={{width: 30, height: 29}}
          />

          <BarChart
            value={0}
            title={'Step Length'}
            unit={'meter'}
            color={Colors.background.primary}
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: [],
                },
              ],
            }}
            image={Images.FootArrowIcon}
            imageSytle={{width: 28, height: 23}}
          />

          <BarChart
            value={0}
            title={'Walking Speed'}
            unit={'Km/h'}
            color={Colors.background.primary}
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: [],
                },
              ],
            }}
            image={Images.WalkingFoot}
            imageSytle={{width: 27, height: 21}}
          />

          <BarChart
            value={datakcal.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0,
            )}
            title={'Calories Burn'}
            unit={'Kcal'}
            color={Colors.background.primary}
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: datakcal,
                },
              ],
            }}
            image={Images.KcalIcon}
            imageSytle={{width: 18, height: 24}}
          />
        </ScrollView>
      </View>
    </View>
  );
}
