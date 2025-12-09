import {ActivityIndicator, ScrollView, View} from 'react-native';
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
import moment from 'moment';
import {getGarminDailyRangeDataRequest} from '../../redux/slicers/user';
import {GET_GARMIN_DAILY_DATA} from '../../config/WebService';
import {Oauth1Helper} from '../../hooks/oauth';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

export default function ActivityAllChartGarmin() {
  const navigate = useNavigation();
  const refFlatlist = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(() => 0);
  // const weeksData = util.getCurrentMonthWeeks();
  const [weeksData, setWeeksData] = useState([]);
  const {garminToken} = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [dataTotalSteps, setDataTotalSteps] = useState({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [datakcal, setDataKcal] = useState({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [dataSpeed, setDataSpeed] = useState({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [dataStepLength, setDataStepLength] = useState({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [dataDistance, setDataDistance] = useState({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [selectedWeek, setSelectedWeek] = useState(() => weeksData[0]);

  useEffect(() => {
    const _weeksData = util.getCurrentMonthWeeks();
    setWeeksData(_weeksData);
    const currentDate = new Date();

    const currentWeekIndex = _weeksData.findIndex((week) => {
      return currentDate >= week?.startDate && currentDate <= week?.endDate;
    });

    if (currentWeekIndex !== -1) {
      setSelectedWeek(_weeksData[currentWeekIndex]);
      setTimeout(() => {
        refFlatlist.current.scrollToIndex({
          index: currentWeekIndex,
          animated: true,
        });
      }, 1500);
    } else {
      setSelectedWeek(_weeksData[0]);
    }
  }, []);

  const manipulateStepData = (finalResponse) => {
    const sortedResponse = [...finalResponse].sort(
      (a, b) =>
        new Date(b?.params?.dayStartText) - new Date(a?.params?.dayStartText),
    );
    const graphDaysLabels = [];
    const graphDaysData = [];
    const graphKcalDaysData = [];
    const graphSpeedDaysData = [];
    const graphStepLengthDaysData = [];
    const graphDistanceDaysData = [];

    const graphData = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

    const graphKcalData = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

    const graphSpeedData = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

    const graphStepLengthData = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

    const graphDistanceData = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

    for (const res of sortedResponse) {
      const {params, response} = res;
      const element = response?.[0];

      const distance = element?.distanceInMeters ?? 0;
      const distanceInKileMeters = parseInt((distance / 1000).toFixed(0)) ?? 0;
      const walkDuration = element?.activeTimeInSeconds ?? 0;

      const speed =
        distance > 0 && walkDuration > 0
          ? (distance / walkDuration).toFixed(2)
          : 0;

      const feetDistance = 3.28084 * distance ?? 0;

      const stepLength = (feetDistance / (element?.steps ?? 1)).toFixed(2);

      graphDaysLabels.push({
        day: moment(params?.dayStartText).format('ddd'),
        time: params?.dayStartText,
      });

      graphDaysData.push(element?.steps ?? 0);
      graphKcalDaysData.push(element?.activeKilocalories ?? 0);
      graphSpeedDaysData.push(speed ?? 0);
      graphStepLengthDaysData.push(stepLength ?? 0);
      graphDistanceDaysData.push(distanceInKileMeters ?? 0);
    }

    graphDaysLabels.sort((a, b) => new Date(a?.time) - new Date(b?.time));

    graphData.labels = graphDaysLabels?.map((item) => item?.day);
    graphData.datasets[0].data = graphDaysData.reverse();

    graphKcalData.labels = graphDaysLabels?.map((item) => item?.day);
    graphKcalData.datasets[0].data = graphKcalDaysData.reverse();

    graphSpeedData.labels = graphDaysLabels?.map((item) => item?.day);
    graphSpeedData.datasets[0].data = graphSpeedDaysData.reverse();

    graphStepLengthData.labels = graphDaysLabels?.map((item) => item?.day);
    graphStepLengthData.datasets[0].data = graphStepLengthDaysData.reverse();

    graphDistanceData.labels = graphDaysLabels?.map((item) => item?.day);
    graphDistanceData.datasets[0].data = graphDistanceDaysData.reverse();

    setDataTotalSteps(graphData);
    setDataKcal(graphKcalData);
    setDataSpeed(graphSpeedData);
    setDataStepLength(graphStepLengthData);
    setDataDistance(graphDistanceData);
  };

  useMemo(() => {
    try {
      if (_.isEmpty(selectedWeek)) return;
      setIsLoading(true);
      const payload = [];

      const weekEndDate = selectedWeek?.endDate;

      for (let i = 0; i < 7; i++) {
        const dayStart = parseInt(
          new Date(
            moment(weekEndDate)
              .local()
              .subtract(i, 'days')
              .format('YYYY-MM-DD') + 'T00:00:00',
          ).getTime() / 1000,
        );
        const dayEnd = parseInt(
          new Date(
            moment(weekEndDate)
              .local()
              .subtract(i, 'days')
              .add(1, 'day')
              .format('YYYY-MM-DD') + 'T00:00:00',
          ).getTime() / 1000,
        );

        const dayStartText = moment(weekEndDate)
          .local()
          .subtract(i, 'days')
          .format('YYYY-MM-DD');

        const dayEndText = moment(weekEndDate)
          .local()
          .subtract(i, 'days')
          .add(1, 'day')
          .format('YYYY-MM-DD');

        payload.push({
          uploadStartTimeInSeconds: dayStart,
          uploadEndTimeInSeconds: dayEnd,
          dayStartText,
          dayEndText,
          i,
        });
      }

      if (!payload.length) {
        setLoading(false);
        navigate.goBack();
        return;
      }

      const finalResponse = [];
      const finalResponseNoData = [];

      function getGarminHeartRate(
        sleepData,
        numberOfDays,
        request,
        requestObject,
        callback = () => {},
        activityType = '',
      ) {
        try {
          let _payloadDuplicate = [...numberOfDays];

          const requestUrl = {
            ...requestObject,
            url: `${requestObject?.url}?uploadStartTimeInSeconds=${sleepData.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${sleepData?.uploadEndTimeInSeconds}`,
          };

          const headers = Oauth1Helper.getAuthHeaderForRequest(
            requestUrl,
            garminToken,
          );

          dispatch(
            request({
              payloadData: {
                headers,
                params: {
                  ...sleepData,
                },
              },
              responseCallback: (status, res) => {
                const {params, response} = res;
                if (status) {
                  for (let dateTime of numberOfDays) {
                    const findFinalData = finalResponse.find(
                      (item) =>
                        item?.params?.dayStartText === dateTime?.dayStartText,
                    );

                    if (findFinalData) continue;

                    const findItemCondition = (item) =>
                      activityType
                        ? item?.calendarDate ===
                            moment(dateTime?.dayStartText)?.format(
                              'YYYY-MM-DD',
                            ) && item?.activityType === activityType
                        : item?.calendarDate ===
                          moment(dateTime?.dayStartText)?.format('YYYY-MM-DD');

                    const findData = [...response]
                      .sort(
                        (a, b) => b?.durationInSeconds - a?.durationInSeconds,
                      )
                      ?.find((item) => findItemCondition(item));

                    if (findData) {
                      _payloadDuplicate = [..._payloadDuplicate]?.filter(
                        (a) => a?.dayStartText !== dateTime?.dayStartText,
                      );

                      finalResponse?.push({
                        params: dateTime,
                        response: [findData],
                      });
                    } else {
                      if (params?.dayStartText === dateTime?.dayStartText) {
                        _payloadDuplicate = [..._payloadDuplicate]?.filter(
                          (a) => a?.dayStartText !== dateTime?.dayStartText,
                        );
                        const noData = [
                          ...finalResponse,
                          ...finalResponseNoData,
                        ]?.find(
                          (item) =>
                            item?.params?.dayStartText === params?.dayStartText,
                        );

                        if (
                          !noData &&
                          moment(dateTime?.dayStartText)?.isSameOrBefore(
                            moment(params?.dayStartText),
                          )
                        )
                          finalResponseNoData.push({
                            params: dateTime,
                            response: [{}],
                          });
                      }
                    }
                  }
                } else {
                  const findFinalData = [
                    ...finalResponse,
                    ...finalResponseNoData,
                  ]?.find(
                    (item) =>
                      item?.params?.dayStartText === params?.dayStartText,
                  );

                  _payloadDuplicate = [..._payloadDuplicate]?.filter(
                    (a) => a?.dayStartText !== params?.dayStartText,
                  );
                  if (!findFinalData) finalResponseNoData.push({...res});
                }

                if (
                  [...finalResponse, ...finalResponseNoData]?.length ===
                  payload?.length
                ) {
                  if (finalResponse?.length > 0) callback();
                  else {
                    // setIsLoading(false);
                    callback();
                  }
                } else {
                  if (_payloadDuplicate?.length > 0) {
                    getGarminHeartRate(
                      _payloadDuplicate?.[0],
                      _payloadDuplicate,
                      request,
                      requestObject,
                      callback,
                      activityType,
                    );
                  } else {
                    callback();
                  }
                }
              },
            }),
          );
        } catch (error) {
          console.log(error);
        }
      }

      if (payload?.length > 0) {
        getGarminHeartRate(
          payload?.[0],
          payload,
          getGarminDailyRangeDataRequest,
          GET_GARMIN_DAILY_DATA,
          () => {
            manipulateStepData([...finalResponse, ...finalResponseNoData]);
            setIsLoading(false);
          },
          'GENERIC',
        );
      }
    } catch (error) {
      console.log('memo error --->>>>', error);
      // setLoading(false);
    }
  }, [selectedWeek]);

  function clickOnRight(index) {
    if (index !== 0) {
      setSelectedWeek(weeksData[index - 1]);
      refFlatlist.current.scrollToIndex({
        index: index - 1,
        animated: true,
      });
    }
  }
  function clickOnLeft(index) {
    if (weeksData.length - 1 !== index) {
      setSelectedWeek(weeksData[index + 1]);
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
          data={weeksData}
          clickOnLeft={clickOnLeft}
          clickOnRight={clickOnRight}
          refFlatlist={refFlatlist}
          styleView={styles.CarouseView}
          setCurrentIndex={setCurrentIndex}
        />
        {isLoading && <ActivityIndicator size={'large'} />}
        {isLoading !== true && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <BarChart
              value={dataTotalSteps?.datasets?.[0]?.data?.reduce(
                (accumulator, currentValue) =>
                  accumulator + parseInt(currentValue),
                0,
              )}
              title={'Total Steps'}
              unit={'Steps'}
              color={'#FF294F'}
              data={dataTotalSteps}
              image={Images.StepsRunner}
              imageSytle={{width: 26, height: 26, tintColor: '#FF294F'}}
            />
            <BarChart
              value={dataDistance?.datasets?.[0]?.data?.reduce(
                (accumulator, currentValue) =>
                  accumulator + parseInt(currentValue),
                0,
              )}
              title={'Distance'}
              unit={'km'}
              color={Colors.background.primary}
              data={dataDistance}
              image={Images.DistanceIcon}
              imageSytle={{width: 30, height: 29}}
            />

            <BarChart
              value={dataStepLength?.datasets?.[0]?.data?.reduce(
                (accumulator, currentValue) =>
                  accumulator + parseInt(currentValue),
                0,
              )}
              title={'Step Length'}
              unit={'meter'}
              color={Colors.background.primary}
              data={dataStepLength}
              image={Images.FootArrowIcon}
              imageSytle={{width: 28, height: 23}}
            />

            <BarChart
              value={dataSpeed?.datasets?.[0]?.data?.reduce(
                (accumulator, currentValue) =>
                  accumulator + parseInt(currentValue),
                0,
              )}
              title={'Walking Speed'}
              unit={'Km/h'}
              color={Colors.background.primary}
              data={dataSpeed}
              image={Images.WalkingFoot}
              imageSytle={{width: 27, height: 21}}
            />

            <BarChart
              value={datakcal?.datasets?.[0]?.data?.reduce(
                (accumulator, currentValue) =>
                  accumulator + parseInt(currentValue),
                0,
              )}
              title={'Calories Burn'}
              unit={'Kcal'}
              color={'#FF294F'}
              data={datakcal}
              image={Images.KcalIcon}
              imageSytle={{width: 18, height: 24}}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
}

// useEffect(() => {
//   const options = {
//     startDate: selectedWeek.startDate.toISOString(),
//     endDate: selectedWeek.endDate.toISOString(),
//   };

//   let stepCountWeekly = [];
//   for (
//     var arr = [], dt = new Date(options.startDate);
//     dt <= new Date(options.endDate);
//     dt.setDate(dt.getDate() + 1)
//   ) {
//     arr.push(new Date(dt));
//   }
//   arr.map((item) => {
//     const stepOption = {
//       date: new Date(item).toISOString(),
//     };
//     appleHealthKit.getStepCount(stepOption, (callbackError, results) => {
//       stepCountWeekly.push(results.value);
//     });
//   });
//   setDataTotalSteps(stepCountWeekly);

//   appleHealthKit.getActiveEnergyBurned(options, (callbackError, results) => {
//     const result1 = util.addSameDateValue(results);
//     const newArray = util.fillMissingDaysWithDataSleep(
//       result1,
//       options.startDate,
//       options.endDate,
//     );
//     const values = newArray.map((item) => item.value);
//     setDataKcal(values);
//   });
// }, [selectedWeek]);
