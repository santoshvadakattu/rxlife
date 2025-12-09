import {ActivityIndicator, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  BarChart,
  CarouselListArrow,
  CustomNavbar,
  Text,
} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import util from '../../util';
import appleHealthKit from 'react-native-health';
import moment from 'moment';
import _ from 'lodash';

export default function IndividualActivity({route}) {
  const {item, imageSytle, value} = route.params;
  const {title, unit, color, image} = item;
  const WeeksData = util.getCurrentMonthWeeks();
  const [selectedWeek, setSelectedWeek] = useState(() => {});
  const [weekDate, setWeekDate] = useState(() => []);
  const [data, setData] = useState(() => []);
  const [currentIndex, setCurrentIndex] = useState(() => 0);
  const sumValues = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  const navigate = useNavigation();
  const refFlatlist = useRef(null);
  // useEffect(() => {
  //   setSelectedWeek(WeeksData[currentIndex]);
  // }, [currentIndex]);

  useEffect(() => {
    const currentDate = new Date();

    const currentWeekIndex = WeeksData.findIndex((week) => {
      return currentDate >= week.startDate && currentDate <= week.endDate;
    });
    if (currentWeekIndex !== -1) {
      setSelectedWeek(WeeksData[currentWeekIndex]);
      setTimeout(() => {
        refFlatlist?.current?.scrollToIndex({
          index: currentWeekIndex,
          animated: true,
        });
      }, 1500);
    } else {
      setSelectedWeek(WeeksData[0]);
    }
  }, []);
  useEffect(() => {
    if (_.isEmpty(selectedWeek)) return;
    const options = {
      startDate: selectedWeek.startDate.toISOString(),
      endDate: selectedWeek.endDate.toISOString(),
    };

    if (title == 'CALORIES') {
      let i = 0;
      const values = [];

      const getEntries = async (j = 0) => {
        const stepOption = {
          startDate: moment(selectedWeek.startDate)
            .utc(false)
            .add(j, 'days')
            .toISOString(),
          endDate: moment(selectedWeek.startDate)
            .utc(false)
            .add(j + 1, 'days')
            .toISOString(),
        };

        // console.log({stepOption});

        appleHealthKit.getActiveEnergyBurned(
          stepOption,
          (callbackError, results) => {
            i++;

            if (callbackError) {
              values.push(0);

              if (j === 6) {
                setData(values);
              } else {
                getEntries(i);
              }

              return;
            }

            const res = results?.reduce((a, b) => a + b.value, 0);

            values.push(res);

            if (j === 6) {
              setData(values);
            } else {
              getEntries(i);
            }
          },
        );
      };

      getEntries(i);
    } else if (title == 'STEPS') {
      let i = 0;
      const values = [];

      const getEntries = async (j = 0) => {
        const stepOption = {
          startDate: moment(selectedWeek.startDate)
            .utc(false)
            .add(j, 'days')
            .toISOString(),
          endDate: moment(selectedWeek.startDate)
            .utc(false)
            .add(j + 1, 'days')
            .toISOString(),
        };

        // console.log({stepOption});

        appleHealthKit.getDailyStepCountSamples(
          stepOption,
          (callbackError, results) => {
            i++;

            if (callbackError) {
              values.push(0);

              if (j === 6) {
                setData(values);
              } else {
                getEntries(i);
              }

              return;
            }

            const res = results?.reduce((a, b) => a + b.value, 0);

            values.push(res);

            if (j === 6) {
              setData(values);
            } else {
              getEntries(i);
            }
          },
        );
      };

      getEntries(i);
    } else if (title == 'INTENSITY MINUTES') {
      let i = 0;
      const values = [];

      const getEntries = async (j = 0) => {
        const stepOption = {
          startDate: moment(selectedWeek.startDate)
            .utc(false)
            .add(j, 'days')
            .toISOString(),
          endDate: moment(selectedWeek.startDate)
            .utc(false)
            .add(j + 1, 'days')
            .toISOString(),
        };

        // console.log({stepOption});

        appleHealthKit.getAnchoredWorkouts(
          stepOption,
          (callbackError, results) => {
            i++;

            if (callbackError) {
              values.push(0);

              if (j === 6) {
                setData(values);
              } else {
                getEntries(i);
              }

              return;
            }

            const res = results?.data?.reduce((a, b) => a + b.duration, 0);

            values.push(res ? res / 60 : 0);

            if (j === 6) {
              setData(values);
            } else {
              getEntries(i);
            }
          },
        );
      };

      getEntries(i);
    } else if (title === 'RESTING HEART Rt.') {
      let i = 0;
      const values = [];

      const getEntries = async (j = 0) => {
        const stepOption = {
          startDate: moment(selectedWeek.startDate)
            .utc(false)
            .add(j, 'days')
            .toISOString(),
          endDate: moment(selectedWeek.startDate)
            .utc(false)
            .add(j + 1, 'days')
            .toISOString(),
        };

        // console.log({stepOption});

        appleHealthKit.getRestingHeartRateSamples(
          {...stepOption, ascending: false, limit: 1},
          (callbackError, results) => {
            i++;

            if (callbackError || !results?.length) {
              values.push(0);

              if (j === 6) {
                setData(values);
              } else {
                getEntries(i);
              }

              return;
            }

            const res = results?.[0]?.value ?? 0;

            values.push(res);

            if (j === 6) {
              setData(values);
            } else {
              getEntries(i);
            }
          },
        );
      };

      getEntries(i);
    } else if (title === 'HRV') {
      let i = 0;
      const values = [];

      const getEntries = async (j = 0) => {
        const stepOption = {
          startDate: moment(selectedWeek.startDate)
            .utc(false)
            .add(j, 'days')
            .toISOString(),
          endDate: moment(selectedWeek.startDate)
            .utc(false)
            .add(j + 1, 'days')
            .toISOString(),
        };

        // console.log({stepOption});

        appleHealthKit.getHeartRateVariabilitySamples(
          {...stepOption, ascending: false},
          (callbackError, results) => {
            i++;

            if (callbackError || !results?.length) {
              values.push(0);

              if (j === 6) {
                setData(values);
              } else {
                getEntries(i);
              }

              return;
            }

            let val = 0;
            if (results?.length > 0) {
              let total = 0;
              for (let res of results) {
                total += res.value * 1000;
              }

              total = total / results.length;
              total = parseFloat(total?.toFixed(2));
              val = total;
            }

            values.push(val);

            if (j === 6) {
              setData(values);
            } else {
              getEntries(i);
            }
          },
        );
      };

      getEntries(i);
    } else if (title === 'SLEEP') {
      appleHealthKit.getSleepSamples(
        {...options, ascending: true},
        (callbackError, results) => {
          const result1 = util.addSameDateValue(results);
          const newArray = util.fillMissingDaysWithDataSleep(
            result1,
            options.startDate,
            options.endDate,
          );

          const values = newArray.map((item) => item.hoursDifference);
          setData(values);
        },
      );
    } else if (title === 'VO2 MAX') {
      let i = 0;
      const values = [];

      const getEntries = async (j = 0) => {
        const stepOption = {
          startDate: moment(selectedWeek.startDate)
            .utc(false)
            .add(j, 'days')
            .toISOString(),
          endDate: moment(selectedWeek.startDate)
            .utc(false)
            .add(j + 1, 'days')
            .toISOString(),
        };

        // console.log({stepOption});

        appleHealthKit.getVo2MaxSamples(
          {...stepOption, ascending: false, limit: 1, unit: 'ms'},
          (callbackError, results) => {
            i++;

            if (callbackError || !results?.length) {
              values.push(0);

              if (j === 6) {
                setData(values);
              } else {
                getEntries(i);
              }

              return;
            }

            const res = results?.[0]?.value ?? 0;

            values.push(res);

            if (j === 6) {
              setData(values);
            } else {
              getEntries(i);
            }
          },
        );
      };

      getEntries(i);
    }
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

  const renderHeartDetail = () => {
    return (
      <View style={styles.heartBiteView}>
        <View>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={12}
            style={{fontWeight: '500'}}>
            Average
          </Text>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={16}
            style={{fontWeight: '600'}}>
            {!util.isArrayEmpty(data)
              ? (sumValues / data.length).toFixed(0)
              : 0}{' '}
            Bpm
          </Text>
        </View>
        <View style={styles.separaterView} />
        <View>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={12}
            style={{fontWeight: '500'}}>
            Min
          </Text>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={16}
            style={{fontWeight: '600'}}>
            {!util.isArrayEmpty(data) ? Math.min(...data) : 0} Bpm
          </Text>
        </View>
        <View style={styles.separaterView} />
        <View>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={12}
            style={{fontWeight: '500'}}>
            Max
          </Text>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={16}
            style={{fontWeight: '600'}}>
            {!util.isArrayEmpty(data) ? Math.max(...data) : 0} Bpm
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCustomNav}
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.5)',
          paddingHorizontal: 10,
        }}>
        <CarouselListArrow
          data={WeeksData}
          clickOnLeft={clickOnLeft}
          clickOnRight={clickOnRight}
          refFlatlist={refFlatlist}
          styleView={styles.CarouseView}
          setCurrentIndex={setCurrentIndex}
        />
        <BarChart
          value={sumValues || 0}
          title={title}
          unit={unit}
          color={color}
          image={image}
          data={{
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [
              {
                data: data,
              },
            ],
          }}
          imageSytle={imageSytle}
        />
        {title === 'Heart Rate' && renderHeartDetail()}
      </View>
    </View>
  );
}
