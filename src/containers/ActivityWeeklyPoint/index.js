import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  CarouselListArrow,
  ChallengesList,
  ChallengesListPoints,
  CustomNavbar,
  PointsWeeklyProgress,
  Text,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import CircularProgress from 'react-native-circular-progress-indicator';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import util from '../../util';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {
  getGarminDailyRangeDataRequest,
  getGarminHrvRangeDataRequest,
  getGarminSleepRangeDataRequest,
  getGarminVo2MaxRangeDataRequest,
  getWeeklyPointsRequest,
} from '../../redux/slicers/user';
import moment from 'moment';
import {GET_GARMIN_DAILY_DATA} from '../../config/WebService';
import {Oauth1Helper} from '../../hooks/oauth';
import {connectedWatch} from '../../constants';
import appleHealthKit from 'react-native-health';

export default function ActivityWeeklyPoint() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const refFlatlist = useRef(null);
  const progressRef = useRef(null);
  const WeeksData = util.getCurrentMonthWeeks();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(() => null);
  const [selectedTab, setSeletectTab] = useState(() => 'Steps');

  const {isWatchConnected, garminToken, connectedWatchName, userData} =
    useSelector((state) => state.user);

  const [sumValuesSteps, setSumValuesSteps] = useState(0);
  const [dataSteps, setDataSteps] = useState(() => ({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [],
      },
    ],
  }));

  const [sumValuesCalories, setSumValuesCalories] = useState(0);
  const [dataCalories, setDataCalories] = useState(() => ({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [],
      },
    ],
  }));

  const [sumValuesIntensity, setSumValuesIntensity] = useState(0);
  const [dataIntensity, setDataIntensity] = useState(() => ({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [],
      },
    ],
  }));

  const [challengesList, setChallengesList] = useState([]);

  const [points, setPoints] = useState({
    total: 0,
    earned: 0,
  });

  useEffect(() => {
    const currentDate = new Date();
    const currentWeekIndex = WeeksData.findIndex((week) => {
      return currentDate >= week?.startDate && currentDate <= week?.endDate;
    });

    if (currentWeekIndex !== -1) {
      setSelectedWeek(WeeksData[currentWeekIndex]);
      setTimeout(() => {
        refFlatlist?.current?.scrollToIndex?.({
          index: currentWeekIndex,
          animated: true,
        });
      }, 1500);
    } else {
      setSelectedWeek(WeeksData[0]);
    }
  }, []);

  useMemo(() => {
    try {
      if (_.isEmpty(selectedWeek)) return;
      setIsLoading(true);

      const startDate = moment(selectedWeek?.startDate)
        .local(true)
        .format('YYYY-MM-DD');

      const endDate = moment(selectedWeek?.endDate)
        .local(true)
        .format('YYYY-MM-DD');

      dispatch(
        getWeeklyPointsRequest({
          payloadData: {
            query: `startDate=${startDate}&endDate=${endDate}`,
          },
          responseCallback: (status, res) => {
            if (status) {
              setPoints({
                total: res?.total ?? 0,
                earned: res?.earned ?? 0,
              });

              progressRef?.current?.reAnimate?.();

              const listingData = [...res?.challenges];
              listingData.sort(
                (a, b) => new Date(a?.day?.date) - new Date(b?.day?.date),
              );

              setChallengesList(listingData ?? []);
            }
            setIsLoading(false);
          },
        }),
      );
    } catch (error) {
      // setLoading(false);
    }
    calculateWeeklyData();
  }, [selectedWeek]);

  async function calculateWeeklyData() {
    if (connectedWatchName === connectedWatch?.GRAMIN) {
      await garminData();
    } else {
      getAppleCaloriesData();
      getAppleStepsData();
      getAppleIntensityData();
    }
  }

  async function garminData() {
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
      }

      const finalResponse = [];
      const finalResponseNoData = [];

      function getGarminHeartRate(
        sleepData,
        numberOfDays,
        request,
        requestObject,
        callback = () => {},
        data,
        setData,
        sumData,
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
                console.log({response, requestUrl, headers});
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

                    sumData(0);
                  }
                } else {
                  if (_payloadDuplicate?.length > 0) {
                    getGarminHeartRate(
                      _payloadDuplicate?.[0],
                      _payloadDuplicate,
                      request,
                      requestObject,
                      callback,
                      data,
                      setData,
                      sumData,
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
          console.log('memo error --->>>>', error);
          setIsLoading(false);
        }
      }

      if (payload?.length > 0) {
        ///steps
        await getGarminHeartRate(
          payload?.[0],
          payload,
          getGarminDailyRangeDataRequest,
          GET_GARMIN_DAILY_DATA,
          () => {
            manipulateStepData([...finalResponse, ...finalResponseNoData]);
          },
          dataSteps,
          setDataSteps,
          setSumValuesSteps,
        );
        //calories
        await getGarminHeartRate(
          payload?.[0],
          payload,
          getGarminDailyRangeDataRequest,
          GET_GARMIN_DAILY_DATA,
          () => {
            manipulateCaloriesData([...finalResponse, ...finalResponseNoData]);
          },
          dataCalories,
          setDataCalories,
          setSumValuesCalories,
        );
        //intensity
        await getGarminHeartRate(
          payload?.[0],
          payload,
          getGarminDailyRangeDataRequest,
          GET_GARMIN_DAILY_DATA,
          () => {
            manipulateIntensityData([...finalResponse, ...finalResponseNoData]);
          },
          dataIntensity,
          setDataIntensity,
          setSumValuesIntensity,
        );
        setIsLoading(false);
      } else {
        // setLoading(false);
      }
    } catch (error) {
      console.log('memo error --->>>>', error);
      // setLoading(false);
    }
  }

  function getAppleCaloriesData() {
    let i = 0;
    const values = [];
    const graphData = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

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

      appleHealthKit.getActiveEnergyBurned(
        stepOption,
        (callbackError, results) => {
          i++;

          if (callbackError) {
            values.push(0);

            if (j === 6) {
              graphData.datasets[0].data = values;
              setSumValuesCalories([...values].reduce((a, b) => a + b, 0));
              setDataCalories(graphData);
            } else {
              getEntries(i);
            }

            return;
          }

          const res = results?.reduce((a, b) => a + b.value, 0);

          values.push(res);

          if (j === 6) {
            graphData.labels = [
              'Sun',
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
            ];
            graphData.datasets[0].data = values;
            setSumValuesCalories([...values].reduce((a, b) => a + b, 0));
            setDataCalories(graphData);
          } else {
            getEntries(i);
          }
        },
      );
    };

    getEntries(i);
  }

  function getAppleIntensityData() {
    let i = 0;
    const values = [];
    const graphData = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

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

      appleHealthKit.getAnchoredWorkouts(
        stepOption,
        (callbackError, results) => {
          i++;

          if (callbackError) {
            values.push(0);

            if (j === 6) {
              graphData.datasets[0].data = values;
              setSumValuesIntensity([...values].reduce((a, b) => a + b, 0));
              setDataIntensity(graphData);
            } else {
              getEntries(i);
            }

            return;
          }

          const res = results?.data?.reduce((a, b) => a + b.duration, 0);

          values.push(res ? res / 60 : 0);

          if (j === 6) {
            graphData.labels = [
              'Sun',
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
            ];
            graphData.datasets[0].data = values;
            setSumValuesIntensity([...values].reduce((a, b) => a + b, 0));
            setDataIntensity(graphData);
          } else {
            getEntries(i);
          }
        },
      );
    };

    getEntries(i);
  }

  function getAppleStepsData() {
    let i = 0;
    const values = [];
    const graphData = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

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

      appleHealthKit.getDailyStepCountSamples(
        stepOption,
        (callbackError, results) => {
          i++;

          if (callbackError) {
            values.push(0);

            if (j === 6) {
              graphData.datasets[0].data = values;
              setSumValuesSteps([...values].reduce((a, b) => a + b, 0));
              setDataSteps(graphData);
            } else {
              getEntries(i);
            }

            return;
          }

          const res = results?.reduce((a, b) => a + b.value, 0);

          values.push(res);

          if (j === 6) {
            graphData.labels = [
              'Sun',
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
            ];
            graphData.datasets[0].data = values;
            setSumValuesSteps([...values].reduce((a, b) => a + b, 0));
            setDataSteps(graphData);
          } else {
            getEntries(i);
          }
        },
      );
    };

    getEntries(i);
  }

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

    setSumValuesSteps([...graphDaysData].reduce((a, b) => a + b, 0));
    setDataSteps(graphData);
  };

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

    setSumValuesCalories([...graphDaysData].reduce((a, b) => a + b, 0));
    setDataCalories(graphData);
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

    setSumValuesIntensity([...graphDaysData].reduce((a, b) => a + b, 0));
    setDataIntensity(graphData);
  };

  useEffect(() => {
    // progressRef?.current?.reAnimate?.();
  }, [value]);

  function clickOnRight(index) {
    if (index !== 0) {
      refFlatlist.current.scrollToIndex({
        index: index - 1,
        animated: true,
      });
      setSelectedWeek(WeeksData[index - 1]);
    }
  }

  function clickOnLeft(index) {
    if (WeeksData?.length - 1 !== index) {
      refFlatlist.current.scrollToIndex({
        index: index + 1,
        animated: true,
      });
      setSelectedWeek(WeeksData[index + 1]);
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

  const value =
    points?.earned > 0
      ? points?.total > 0
        ? (points?.earned / points?.total) * 60
        : 0
      : 0;

  const renderCircleProgess = () => {
    return (
      <View
        style={{
          padding: 15,
          width: '100%',
          height: 180,
          borderRadius: 12,
          backgroundColor: Colors.white,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 1.5,
          elevation: 2,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <CircularProgress
          value={value}
          radius={60}
          ref={progressRef}
          maxValue={60}
          initialValue={0}
          activeStrokeWidth={15}
          inActiveStrokeWidth={15}
          duration={5000}
          clockwise={true}
          progressValueColor={Colors.text.primary}
          progressValueFontSize={1}
          activeStrokeColor={'#61D85E'}
          inActiveStrokeColor={'#def7df'}
          title={`${points?.earned} pt`}
          subtitle={`${points?.total} pt`}
          titleFontSize={16}
          titleColor={Colors.text.primary}
          titleStyle={{fontFamily: Fonts.type.bold}}
          subtitleFontSize={12}
          subtitleColor={Colors.text.primary}
          subtitleStyle={{fontFamily: Fonts.type.medium}}
        />
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image
            source={Images.unFillStart}
            style={{
              width: 17,
              height: 17,
              resizeMode: 'contain',
              marginRight: 5,
            }}
          />
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={Fonts.size.xxxSmall}
            style={{fontWeight: '500'}}>
            Winning Points
          </Text>
        </View>
      </View>
    );
  };

  const renderChallenges = () => {
    return <ChallengesList data={challengesList} />;
  };

  const renderPointsWeekly = () => {
    return (
      <PointsWeeklyProgress
        pointsValue={value}
        totalPoints={points?.total}
        earnedPoints={points?.earned}
        stepsValue={sumValuesSteps}
        caloriesValue={sumValuesCalories}
        intensityValue={sumValuesIntensity}
      />
    );
  };

  const renderTabs = () => {
    return (
      <View
        style={{
          height: 48,
          borderRadius: 12,
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: '#f4f5f6',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => setSeletectTab('Steps')}
          style={[
            styles.tabSelected,
            selectedTab == 'Steps' && {
              backgroundColor: Colors.background.primary,
            },
          ]}>
          <Text
            size={Fonts.size.xxSmall}
            color={selectedTab == 'Steps' ? Colors.white : Colors.black}>
            Steps
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSeletectTab('Calories')}
          style={[
            styles.tabSelected,
            selectedTab == 'Calories' && {
              backgroundColor: Colors.background.primary,
            },
          ]}>
          <Text
            size={Fonts.size.xxSmall}
            color={selectedTab == 'Calories' ? Colors.white : Colors.black}
            style={styles.tabSelectedTxt}>
            Calories
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSeletectTab('Intensity')}
          style={[
            styles.tabSelected,
            selectedTab == 'Intensity' && {
              backgroundColor: Colors.background.primary,
            },
          ]}>
          <Text
            size={Fonts.size.xxSmall}
            color={selectedTab == 'Intensity' ? Colors.white : Colors.black}>
            Intensity
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSeletectTab('Points')}
          style={[
            styles.tabSelected,
            selectedTab == 'Points' && {
              backgroundColor: Colors.background.primary,
            },
          ]}>
          <Text
            size={Fonts.size.xxSmall}
            color={selectedTab == 'Points' ? Colors.white : Colors.black}>
            Points
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderChallengesPoints = useMemo(() => {
    if (selectedTab === 'Steps') {
      return (
        <ChallengesListPoints
          weeklydata={selectedWeek}
          data={dataSteps}
          listName={'Steps'}
        />
      );
    } else if (selectedTab === 'Calories') {
      return (
        <ChallengesListPoints
          weeklydata={selectedWeek}
          data={dataCalories}
          listName={'Calories'}
        />
      );
    } else if (selectedTab === 'Intensity') {
      return (
        <ChallengesListPoints
          weeklydata={selectedWeek}
          data={dataIntensity}
          listName={'Intensity'}
        />
      );
    } else if (selectedTab === 'Points') {
      return <ChallengesList data={challengesList} />;
    }
  }, [
    challengesList,
    selectedTab,
    selectedWeek,
    dataSteps,
    dataCalories,
    dataIntensity,
  ]);

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
          setCurrentIndex={() => {}}
        />
        {isLoading && (
          <ActivityIndicator size={'large'} style={AppStyles.mTop15} />
        )}

        {!isLoading && (
          <ScrollView
            style={{flex: 1}}
            nestedScrollEnabled={true}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
            showsVerticalScrollIndicator={false}>
            <View>
              {isWatchConnected ? (
                <>
                  {renderPointsWeekly()}
                  {renderTabs()}
                  {renderChallengesPoints}
                </>
              ) : (
                <>
                  {renderCircleProgess()}
                  {renderChallenges()}
                </>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
