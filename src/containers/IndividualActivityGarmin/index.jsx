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
import util, {convetStringToObject} from '../../util';
import {useDispatch, useSelector} from 'react-redux';
import {
  getGarminDailyRangeDataRequest,
  getGarminHrvRangeDataRequest,
  getGarminSleepRangeDataRequest,
  getGarminVo2MaxRangeDataRequest,
} from '../../redux/slicers/user';
import moment from 'moment';
import {
  GET_GARMIN_DAILY_DATA,
  GET_GARMIN_HRV_DATA,
  GET_GARMIN_SLEEP_DATA,
  GET_GARMIN_VO2MAX_DATA,
} from '../../config/WebService';
import {Oauth1Helper} from '../../hooks/oauth';
import _ from 'lodash';

export default function IndividualActivityGarmin({route}) {
  const {item, imageSytle, value} = route.params;
  const {title, unit, color, image} = item;
  // const weeksData = util.getCurrentMonthWeeks();

  const [weeksData, setWeeksData] = useState([]);

  // console.log({weeksData});

  const [selectedWeek, setSelectedWeek] = useState(() => {});
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(() => ({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [],
      },
    ],
  }));
  const [currentIndex, setCurrentIndex] = useState(() => 0);
  const [sumValues, setSumValues] = useState(0);

  const {garminToken} = useSelector((state) => state?.user);
  const navigate = useNavigation();
  const refFlatlist = useRef(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setSelectedWeek(weeksData[currentIndex]);
  // }, [currentIndex]);

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
        refFlatlist?.current?.scrollToIndex({
          index: currentWeekIndex,
          animated: true,
        });
      }, 1500);
    } else {
      setSelectedWeek(_weeksData[0]);
    }
  }, []);

  const manipulateCaloriesData = (finalResponse) => {
    const sortedResponse = [...finalResponse].sort(
      (a, b) =>
        new Date(b?.params?.dayStartText) - new Date(a?.params?.dayStartText),
    );
    const graphDaysLabels = [];
    const graphDaysData = [];
    const graphData = {
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

      graphDaysLabels.push({
        day: moment(params?.dayStartText).format('ddd'),
        time: params?.dayStartText,
      });
      graphDaysData.push(element?.activeKilocalories ?? 0);
    }

    graphDaysLabels.sort((a, b) => new Date(a?.time) - new Date(b?.time));

    graphData.labels = graphDaysLabels?.map((item) => item?.day);
    graphData.datasets[0].data = graphDaysData.reverse();

    setSumValues([...graphDaysData].reduce((a, b) => a + b, 0));
    setData(graphData);
  };

  const manipulateIntensityData = (finalResponse) => {
    const sortedResponse = [...finalResponse].sort(
      (a, b) =>
        new Date(b?.params?.dayStartText) - new Date(a?.params?.dayStartText),
    );
    const graphDaysLabels = [];
    const graphDaysData = [];
    const graphData = {
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

      graphDaysLabels.push({
        day: moment(params?.dayStartText).format('ddd'),
        time: params?.dayStartText,
      });

      const totalIntensity =
        element?.moderateIntensityDurationInSeconds +
        element?.vigorousIntensityDurationInSeconds * 2;

      const intensityInMinutes = totalIntensity
        ? parseInt(totalIntensity / 60)
        : 0;
      graphDaysData.push(parseFloat(intensityInMinutes?.toFixed(2)));
    }

    graphDaysLabels.sort((a, b) => new Date(a?.time) - new Date(b?.time));

    graphData.labels = graphDaysLabels?.map((item) => item?.day);
    graphData.datasets[0].data = graphDaysData.reverse();

    setSumValues([...graphDaysData].reduce((a, b) => a + b, 0));
    setData(graphData);
  };

  const manipulateSleepData = (finalResponse) => {
    const sortedResponse = [...finalResponse].sort(
      (a, b) =>
        new Date(b?.params?.dayStartText) - new Date(a?.params?.dayStartText),
    );

    const graphDaysLabels = [];
    const graphDaysData = [];
    const graphData = {
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

      graphDaysLabels.push({
        day: moment(params?.dayStartText).format('ddd'),
        time: params?.dayStartText,
      });
      const timeInMinutes = element?.durationInSeconds
        ? parseInt(element?.durationInSeconds / 60)
        : 0;

      const timeInHours = parseFloat((timeInMinutes / 60).toFixed(2));
      graphDaysData.push(timeInHours);
    }

    graphDaysLabels.sort((a, b) => new Date(a?.time) - new Date(b?.time));

    graphData.labels = graphDaysLabels?.map((item) => item?.day);
    graphData.datasets[0].data = graphDaysData.reverse();

    setSumValues(graphDaysData.reduce((a, b) => a + b, 0));
    setData(graphData);
  };

  const manipulateHeartData = (finalResponse) => {
    const sortedResponse = [...finalResponse].sort(
      (a, b) =>
        new Date(b?.params?.dayStartText) - new Date(a?.params?.dayStartText),
    );
    const graphDaysLabels = [];
    const maxHeartRate = [];

    const graphData = {
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

      const values = element?.timeOffsetHeartRateSamples
        ? Object.values(element?.timeOffsetHeartRateSamples)
        : [];

      values?.sort((a, b) => a - b);

      graphDaysLabels.push({
        day: moment(params?.dayStartText).format('ddd'),
        time: params?.dayStartText,
      });

      maxHeartRate.push(element?.restingHeartRateInBeatsPerMinute ?? 0);
    }

    graphDaysLabels.sort((a, b) => new Date(a?.time) - new Date(b?.time));

    graphData.labels = graphDaysLabels?.map((item) => item?.day);
    graphData.datasets[0].data = [...maxHeartRate.reverse()];

    maxHeartRate.sort((a, b) => b - a);
    const filteredHeartRate = maxHeartRate?.filter((h) => h > 0);
    const _total = _.sum(maxHeartRate) / filteredHeartRate?.length;
    setSumValues(_total);
    setData(graphData);
  };

  const manipulateStepData = (finalResponse) => {
    const sortedResponse = [...finalResponse].sort(
      (a, b) =>
        new Date(b?.params?.dayStartText) - new Date(a?.params?.dayStartText),
    );
    const graphDaysLabels = [];
    const graphDaysData = [];
    const graphData = {
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

      graphDaysLabels.push({
        day: moment(params?.dayStartText).format('ddd'),
        time: params?.dayStartText,
      });
      graphDaysData.push(element?.steps ?? 0);
    }

    graphDaysLabels.sort((a, b) => new Date(a?.time) - new Date(b?.time));

    graphData.labels = graphDaysLabels?.map((item) => item?.day);
    graphData.datasets[0].data = graphDaysData.reverse();

    setSumValues([...graphDaysData].reduce((a, b) => a + b, 0));
    setData(graphData);
  };

  const manipulateHrvData = (finalResponse) => {
    const sortedResponse = [...finalResponse].sort(
      (a, b) =>
        new Date(b?.params?.dayStartText) - new Date(a?.params?.dayStartText),
    );
    const graphDaysLabels = [];
    const graphDaysData = [];
    const graphData = {
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

      const dataObj = convetStringToObject(element?.hrvValues);
      const values = Object.values(dataObj);
      const average = values.reduce((a, b) => a + b, 0) / values.length;

      graphDaysLabels.push({
        day: moment(params?.dayStartText).format('ddd'),
        time: params?.dayStartText,
      });
      graphDaysData.push(average || 0);
    }

    graphDaysLabels.sort((a, b) => new Date(a?.time) - new Date(b?.time));

    graphData.labels = graphDaysLabels?.map((item) => item?.day);
    graphData.datasets[0].data = graphDaysData.reverse();

    const filteredData = graphDaysData?.filter((h) => h > 0);

    const avg =
      [...graphDaysData].reduce((a, b) => a + b, 0) / filteredData?.length ?? 1;
    setSumValues(avg || 0);
    setData(graphData);
  };

  const manipulateVo2MaxData = (finalResponse) => {
    const sortedResponse = [...finalResponse].sort(
      (a, b) =>
        new Date(b?.params?.dayStartText) - new Date(a?.params?.dayStartText),
    );
    const graphDaysLabels = [];
    const graphDaysData = [];
    const graphData = {
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

      graphDaysLabels.push({
        day: moment(params?.dayStartText).format('ddd'),
        time: params?.dayStartText,
      });
      graphDaysData.push(element?.vo2Max ?? 0);
    }

    graphDaysLabels.sort((a, b) => new Date(a?.time) - new Date(b?.time));

    graphData.labels = graphDaysLabels?.map((item) => item?.day);
    graphData.datasets[0].data = graphDaysData.reverse();

    const filteredData = graphDaysData?.filter((h) => h > 0);

    const avg =
      [...graphDaysData].reduce((a, b) => a + b, 0) / filteredData?.length ?? 1;
    setSumValues(avg || 0);
    setData(graphData);
  };

  useMemo(() => {
    try {
      if (_.isEmpty(selectedWeek)) return;

      setIsLoading(true);
      let payload = [];

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
        setIsLoading(false);
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
                _payloadDuplicate = [..._payloadDuplicate]?.filter(
                  (a) => a?.dayStartText !== params?.dayStartText,
                );
                if (status) {
                  for (let dateTime of numberOfDays) {
                    const findFinalData = finalResponse.find(
                      (item) =>
                        item?.params?.dayStartText === dateTime?.dayStartText,
                    );

                    if (findFinalData) continue;

                    const findItemCondition = (item) =>
                      item?.calendarDate ===
                      moment(dateTime?.dayStartText)?.format('YYYY-MM-DD');

                    const findData = [...response]
                      .sort(
                        (a, b) => b?.durationInSeconds - a?.durationInSeconds,
                      )
                      ?.find((item) => findItemCondition(item));

                    if (findData) {
                      // _payloadDuplicate = [..._payloadDuplicate]?.filter(
                      //   (a) => a?.dayStartText !== dateTime?.dayStartText,
                      // );

                      finalResponse?.push({
                        params: dateTime,
                        response: [findData],
                      });
                    } else {
                      if (params?.dayStartText === dateTime?.dayStartText) {
                        // _payloadDuplicate = [..._payloadDuplicate]?.filter(
                        //   (a) => a?.dayStartText !== dateTime?.dayStartText,
                        // );
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

                  // _payloadDuplicate = [..._payloadDuplicate]?.filter(
                  //   (a) => a?.dayStartText !== params?.dayStartText,
                  // );
                  if (!findFinalData) finalResponseNoData.push({...res});
                }

                if (
                  [...finalResponse, ...finalResponseNoData]?.length ===
                  payload?.length
                ) {
                  if (finalResponse?.length > 0) callback();
                  else {
                    setData({
                      ...data,
                      datasets: [
                        {
                          data: [],
                        },
                      ],
                    });

                    setSumValues(0);
                    setIsLoading(false);
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
          setIsLoading(false);
        }
      }

      switch (title) {
        case 'STEPS':
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
            );
          } else {
            // setLoading(false);
          }
          break;

        case 'CALORIES':
          if (payload?.length > 0) {
            getGarminHeartRate(
              payload?.[0],
              payload,
              getGarminDailyRangeDataRequest,
              GET_GARMIN_DAILY_DATA,
              () => {
                manipulateCaloriesData([
                  ...finalResponse,
                  ...finalResponseNoData,
                ]);
                setIsLoading(false);
              },
            );
          } else {
            // setLoading(false);
          }
          break;

        case 'SLEEP':
          if (payload?.length > 0) {
            getGarminHeartRate(
              payload?.[0],
              payload,
              getGarminSleepRangeDataRequest,
              GET_GARMIN_SLEEP_DATA,
              () => {
                manipulateSleepData([...finalResponse, ...finalResponseNoData]);
                setIsLoading(false);
              },
            );
          } else {
            // setLoading(false);
          }
          break;

        case 'RESTING HEART Rt.':
          if (payload?.length > 0) {
            getGarminHeartRate(
              payload?.[0],
              payload,
              getGarminDailyRangeDataRequest,
              GET_GARMIN_DAILY_DATA,
              () => {
                manipulateHeartData([...finalResponse, ...finalResponseNoData]);
                setIsLoading(false);
              },
            );
          } else {
            // setLoading(false);
          }
          break;

        case 'INTENSITY MINUTES':
          if (payload?.length > 0) {
            getGarminHeartRate(
              payload?.[0],
              payload,
              getGarminDailyRangeDataRequest,
              GET_GARMIN_DAILY_DATA,
              () => {
                manipulateIntensityData([
                  ...finalResponse,
                  ...finalResponseNoData,
                ]);
                setIsLoading(false);
              },
            );
          } else {
            // setLoading(false);
          }
          break;

        case 'HRV':
          if (payload?.length > 0) {
            getGarminHeartRate(
              payload?.[0],
              payload,
              getGarminHrvRangeDataRequest,
              GET_GARMIN_HRV_DATA,
              () => {
                manipulateHrvData([...finalResponse, ...finalResponseNoData]);
                setIsLoading(false);
              },
            );
          } else {
            // setLoading(false);
          }
          break;

        case 'VO2 MAX':
          if (payload?.length > 0) {
            getGarminHeartRate(
              payload?.[0],
              payload,
              getGarminVo2MaxRangeDataRequest,
              GET_GARMIN_VO2MAX_DATA,
              () => {
                manipulateVo2MaxData([
                  ...finalResponse,
                  ...finalResponseNoData,
                ]);
                setIsLoading(false);
              },
            );
          } else {
            // setLoading(false);
          }
          break;
        default:
          setIsLoading(false);
          break;
      }
    } catch (error) {
      console.log('memo error --->>>>', error);
      // setLoading(false);
    }
  }, [item, selectedWeek]);

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

  const renderHeartDetail = () => {
    const maxHrRate = data?.datasets?.[0]?.data ?? [];
    const minHrRate = data?.datasets?.[1]?.data ?? [];

    const maxHrRateFiltered = maxHrRate?.filter?.((item) => item > 0) ?? [];
    const maxAvg =
      maxHrRateFiltered?.reduce((a, c) => a + c, 0) /
        maxHrRateFiltered?.length ?? 0;

    const minHrRateFiltered = minHrRate?.filter?.((item) => item > 0) ?? [];
    const minAvg =
      minHrRateFiltered?.reduce((a, c) => a + c, 0) /
        minHrRateFiltered?.length ?? 0;

    const avg = (minAvg + maxAvg) / 2;

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
            {!util.isArrayEmpty(data?.datasets?.[0]?.data)
              ? (avg ?? 0).toFixed(0)
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
            {!util.isArrayEmpty(minHrRateFiltered)
              ? Math.min(...minHrRateFiltered)
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
            Max
          </Text>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={16}
            style={{fontWeight: '600'}}>
            {!util.isArrayEmpty(data?.datasets?.[0]?.data)
              ? Math.max(...data?.datasets?.[0]?.data)
              : 0}{' '}
            Bpm
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
          data={weeksData}
          clickOnLeft={clickOnLeft}
          clickOnRight={clickOnRight}
          refFlatlist={refFlatlist}
          styleView={styles.CarouseView}
          setCurrentIndex={setCurrentIndex}
        />

        {isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <>
            <BarChart
              value={
                title === 'Heart Rate'
                  ? sumValues && sumValues
                  : sumValues && sumValues
              }
              title={title}
              unit={unit}
              color={color}
              image={image}
              data={data}
              imageSytle={imageSytle}
            />
            {title === 'Heart Rate' && renderHeartDetail()}
          </>
        )}
      </View>
    </View>
  );
}
