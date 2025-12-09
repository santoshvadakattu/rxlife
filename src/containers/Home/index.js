import {
  DrawerActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivitiesItem,
  ActivitiesItemDash,
  ActivityMins,
  ButtonView,
  CaloriesRemainingDashboard,
  CustomNavbar,
  Leaderboard,
  ModalCancel,
  OngoingTasks,
  Points,
  PointswithouTarget,
  Text,
  WeeklyActivity,
} from '../../components';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  addActiveDayCountRequest,
  connectAppleWatchRequest,
  deleteGarminUserRequest,
  getDailyPointsRequest,
  getUserDataRequest,
  notificationCountIncrease,
  sendWatchDataRequest,
} from '../../redux/slicers/user';
import {
  NOTIFICATION_TYPES_TEXT,
  SCREENS,
  connectedWatch,
} from '../../constants';
import util from '../../util';
import useGarminRequest from '../../hooks/useGarminRequest';
import {
  getDashboardTasksRequest,
  getOngoingChallengeLeaderboardsRequest,
} from '../../redux/slicers/challenge';
import {updateDeviceToken} from '../../firebase/firebaseHelper';
import {loadRoomDataManipulator} from '../../Helper/chatManipulator';
import {getUnReadChatRequest, loadRoomSuccess} from '../../redux/slicers/chat';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useAppleData} from '../../hooks/useAppleData';
import _ from 'lodash';
import {getDailyNutritionRequest} from '../../redux/slicers/nutritions';
import moment from 'moment';

let tempNotificationData = null;
export default function Home() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {
    userData,
    appleData,
    connectedWatchName,
    garminData,
    isWatchConnected,
    garminToken,
    dailyPoints,
  } = useSelector((state) => state.user);
  const {getAllGarminData} = useGarminRequest();
  const {getAppleData} = useAppleData();
  const [isActive, setIsActive] = useState(() => isWatchConnected);
  const [isWatchModalVisible, setIsWatchModalVisible] = useState(() => false);
  const [isPullToref, setIsPullToRef] = useState(() => false);
  const [pointsLoading, setPointsLoading] = useState(() => false);
  const [refreshLoader, setRefreshLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const {ongoingLeaderboard, ongoingTasks} = useSelector(
    (state) => state?.challenge,
  );
  const {isUnread} = useSelector((state) => state?.chat);

  useEffect(() => {
    setIsActive(isWatchConnected);
  }, [isWatchConnected]);

  useEffect(() => {
    const payload = {
      userId: userData.id,
    };
    dispatch(
      getUserDataRequest({
        payloadData: payload,
        responseCallback: () => {},
      }),
    );

    dispatch(
      addActiveDayCountRequest({
        responseCallback: () => {},
      }),
    );

    _fcmInit();
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(
        getOngoingChallengeLeaderboardsRequest({
          responseCallback: () => {
            setIsLoading(false);
          },
        }),
      );

      dispatch(
        getDashboardTasksRequest({
          responseCallback: () => {
            setIsLoading(false);
          },
        }),
      );

      dispatch(
        getDailyPointsRequest({
          responseCallback: () => {
            setPointsLoading(false);
          },
        }),
      );

      dispatch(
        getUnReadChatRequest({
          headers: {
            Authorization: `Bearer ${userData?.chatUserId}`,
          },
          responseCallback: () => {},
        }),
      );
    }
  }, [isFocused]);

  useEffect(() => {
    // if (!isActive) return;

    if (connectedWatchName == connectedWatch.APPLE) {
      getAppleData();
    }

    if (connectedWatchName === connectedWatch.GRAMIN) {
      getGarminData(false);
    }
  }, [isActive, connectedWatchName]);

  useEffect(() => {
    if (garminToken?.key && garminToken?.secret) {
      getGarminData(false);
    }
  }, [garminToken]);

  useEffect(() => {
    if (connectedWatchName == connectedWatch.GRAMIN) {
      if (_.isEmpty(garminData)) return;
      dispatch(
        sendWatchDataRequest({
          payloadData: {
            ...garminData,
          },
          responseCallback: () => {},
        }),
      );
    }
  }, [garminData]);

  useEffect(() => {
    if (connectedWatchName == connectedWatch.APPLE) {
      if (_.isEmpty(appleData)) return;

      const payload = {
        steps: appleData?.StepsCount ?? 0,
        floorsClimbed: appleData?.FloorClimbed ?? 0,
        stepsGoal: 0,
        intensity: 0, // minutes
        heartRate: {
          min: 80,
          max: 110,
        },
        calories: {
          calories_value: appleData?.Calories ?? 0, // Kilo Calories
          calories_target: 0, // Kilo Calories
        },
        runningDistance: appleData?.Running ?? 0, //kilo meters
        walkingDistance: appleData?.Walking, // kilo meters
        swimmingDistance: appleData?.Swimming ?? 0, //  meters
        sleep: {
          sleep_value: appleData?.SleepHrs ?? 0, // hours,
          sleep_target: 0, // hours,
        },
      };

      dispatch(
        sendWatchDataRequest({
          payloadData: payload,
          responseCallback: () => {},
        }),
      );
    }
  }, [appleData]);

  useEffect(() => {
    apiCallNutrient();
  }, []);

  function apiCallNutrient() {
    dispatch(
      getDailyNutritionRequest({
        payloadData: {
          userId: userData.id,
          date: moment(new Date()).utc(false).format('YYYY-MM-DD'),
        },
        responseCallback: () => {},
      }),
    );
  }

  const openDrawer = () => {
    navigate.dispatch(DrawerActions.openDrawer());
  };

  const _fcmInit = () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      const {data} = remoteMessage;
      const result = data?.result ? JSON.parse(data?.result) : data;

      if (result?.type === NOTIFICATION_TYPES_TEXT.friendInvitation) {
        navigate.navigate(SCREENS.HOME.friendProfile, {
          userId: result?.entity,
        });
      }

      if (result?.type === NOTIFICATION_TYPES_TEXT.challengeReminder) {
        navigate.navigate(SCREENS.HOME.challengeDetail, {
          challengeId: result?.entity,
          myChallenge: true,
          fromNotification: true,
        });
      }

      if (result?.type === NOTIFICATION_TYPES_TEXT.upcomingChallenges) {
        navigate.navigate(SCREENS.HOME.challengeDetail, {
          challengeId: result?.entity,
          myChallenge: false,
          fromNotification: true,
        });
      }

      if (data?.type === NOTIFICATION_TYPES_TEXT.chat) {
        const roomInfo = data?.room?.length > 0 ? JSON.parse(data?.room) : {};

        const manipulatedRoom = loadRoomDataManipulator(roomInfo);

        dispatch(loadRoomSuccess(manipulatedRoom));
        navigate.navigate(SCREENS.HOME.chat);
      }

      if (data?.type === NOTIFICATION_TYPES_TEXT.reaction) {
        const roomInfo = data?.room?.length > 0 ? JSON.parse(data?.room) : {};

        const manipulatedRoom = loadRoomDataManipulator(roomInfo);

        dispatch(loadRoomSuccess(manipulatedRoom));
        navigate.navigate(SCREENS.HOME.chat, {
          fromReactionNotification: true,
          reactionMessageId: data?.reactionMessageId,
        });
      }

      if (
        data?.type !== NOTIFICATION_TYPES_TEXT.chat &&
        data?.type !== NOTIFICATION_TYPES_TEXT.reaction
      ) {
        dispatch(notificationCountIncrease());
      }
    });

    PushNotification.configure({
      onRegister: function (token) {
        updateDeviceToken();
      },
      onNotification: function (notification) {
        const {data, userInteraction} = notification;

        if (Object.keys(data).length) {
          tempNotificationData = data;
        }

        if (userInteraction && util.isPlatformAndroid()) {
          const result = tempNotificationData?.result
            ? JSON.parse(tempNotificationData?.result)
            : {};
          if (
            tempNotificationData?.type ===
              NOTIFICATION_TYPES_TEXT.friendInvitation ||
            result?.type === NOTIFICATION_TYPES_TEXT.friendInvitation
          ) {
            navigate.navigate(SCREENS.HOME.friendProfile, {
              userId:
                tempNotificationData?.entity ||
                tempNotificationData?.entityId ||
                result?.entity,
            });
          }

          if (
            tempNotificationData?.type ===
              NOTIFICATION_TYPES_TEXT.challengeReminder ||
            result?.type === NOTIFICATION_TYPES_TEXT.challengeReminder
          ) {
            navigate.navigate(SCREENS.HOME.challengeDetail, {
              challengeId:
                tempNotificationData?.entity ||
                tempNotificationData?.entityId ||
                result?.entity,
              myChallenge: true,
              fromNotification: true,
            });
          }

          if (
            tempNotificationData?.type ===
              NOTIFICATION_TYPES_TEXT.upcomingChallenges ||
            result?.type === NOTIFICATION_TYPES_TEXT.upcomingChallenges
          ) {
            navigate.navigate(SCREENS.HOME.challengeDetail, {
              challengeId:
                tempNotificationData?.entity ||
                tempNotificationData?.entityId ||
                result?.entity,
              myChallenge: false,
              fromNotification: true,
            });
          }

          if (
            tempNotificationData?.type === NOTIFICATION_TYPES_TEXT.chat ||
            result?.type === NOTIFICATION_TYPES_TEXT.chat
          ) {
            const roomInfo =
              tempNotificationData?.room?.length > 0
                ? JSON.parse(tempNotificationData?.room)
                : {};

            const manipulatedRoom = loadRoomDataManipulator(roomInfo);

            dispatch(loadRoomSuccess(manipulatedRoom));
            navigate.navigate(SCREENS.HOME.chat);
          }

          if (
            tempNotificationData?.type === NOTIFICATION_TYPES_TEXT.reaction ||
            result?.type === NOTIFICATION_TYPES_TEXT.reaction
          ) {
            const roomInfo =
              tempNotificationData?.room?.length > 0
                ? JSON.parse(tempNotificationData?.room)
                : {};

            const manipulatedRoom = loadRoomDataManipulator(roomInfo);

            dispatch(loadRoomSuccess(manipulatedRoom));
            navigate.navigate(SCREENS.HOME.chat, {
              fromReactionNotification: true,
              reactionMessageId: tempNotificationData?.reactionMessageId,
            });
          }

          if (
            tempNotificationData?.type != NOTIFICATION_TYPES_TEXT.chat &&
            result?.type != NOTIFICATION_TYPES_TEXT.chat &&
            tempNotificationData?.type != NOTIFICATION_TYPES_TEXT.reaction &&
            result?.type != NOTIFICATION_TYPES_TEXT.reaction
          )
            dispatch(notificationCountIncrease());
        }

        if (userInteraction && !util.isPlatformAndroid()) {
          const result = data?.result ? JSON.parse(data?.result) : data?.result;

          if (result?.type === NOTIFICATION_TYPES_TEXT.friendInvitation) {
            navigate.navigate(SCREENS.HOME.friendProfile, {
              userId: result?.entity,
            });
          }

          if (result?.type === NOTIFICATION_TYPES_TEXT.challengeReminder) {
            navigate.navigate(SCREENS.HOME.challengeDetail, {
              challengeId: result?.entity,
              myChallenge: true,
              fromNotification: true,
            });
          }

          if (result?.type === NOTIFICATION_TYPES_TEXT.upcomingChallenges) {
            navigate.navigate(SCREENS.HOME.challengeDetail, {
              challengeId: result?.entity,
              myChallenge: false,
              fromNotification: true,
            });
          }

          if (data?.type === NOTIFICATION_TYPES_TEXT.chat) {
            const roomInfo =
              data?.room?.length > 0 ? JSON.parse(data?.room) : {};

            const manipulatedRoom = loadRoomDataManipulator(roomInfo);

            dispatch(loadRoomSuccess(manipulatedRoom));

            navigate.navigate(SCREENS.HOME.chat);
          }

          if (data?.type === NOTIFICATION_TYPES_TEXT.reaction) {
            const roomInfo =
              data?.room?.length > 0 ? JSON.parse(data?.room) : {};

            const manipulatedRoom = loadRoomDataManipulator(roomInfo);

            dispatch(loadRoomSuccess(manipulatedRoom));

            navigate.navigate(SCREENS.HOME.chat, {
              fromReactionNotification: true,
              reactionMessageId: data?.reactionMessageId,
            });
          }

          if (
            data?.type != NOTIFICATION_TYPES_TEXT.chat &&
            data?.type != NOTIFICATION_TYPES_TEXT.reaction
          ) {
            dispatch(notificationCountIncrease());
          }
        }

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {},
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        rightBtnImage={Images.Notification}
        rightBtnImageSecond={Images.Chat}
        leftBtnImage={Images.Drawer}
        leftBtnPress={openDrawer}
        rightBtnPressSecond={() => {
          navigate.navigate(SCREENS.HOME.chatList);
        }}
        rightBtnPress={() => {
          navigate.navigate('notification');
        }}
        isUnread={isUnread}
        notificationCount={userData?.notificationCount}
      />
    );
  }, [userData?.notificationCount, isUnread]);

  async function pullToRefresh() {
    setIsPullToRef(true);
    if (connectedWatchName == connectedWatch.APPLE) {
      getAppleData();
      setIsPullToRef(false);
    }

    if (connectedWatchName === connectedWatch.GRAMIN) {
      getGarminData();
    }

    dispatch(
      getOngoingChallengeLeaderboardsRequest({
        responseCallback: () => {
          if (!connectedWatchName) setIsPullToRef(false);
        },
      }),
    );

    dispatch(
      getDashboardTasksRequest({
        responseCallback: () => {
          if (!connectedWatchName) setIsPullToRef(false);
        },
      }),
    );

    dispatch(
      getDailyPointsRequest({
        responseCallback: () => {
          if (!connectedWatchName) setIsPullToRef(false);
        },
      }),
    );
  }

  async function refreshButtonPress() {
    setRefreshLoader(true);
    if (connectedWatchName == connectedWatch.APPLE) {
      getAppleData();
      // setRefreshLoader(false);
    }

    if (connectedWatchName === connectedWatch.GRAMIN) {
      getGarminData(false);
    }

    dispatch(
      getOngoingChallengeLeaderboardsRequest({
        responseCallback: () => {
          // if (!connectedWatchName)
          setRefreshLoader(false);
        },
      }),
    );

    dispatch(
      getDashboardTasksRequest({
        responseCallback: () => {
          setRefreshLoader(false);
        },
      }),
    );

    dispatch(
      getDailyPointsRequest({
        responseCallback: () => {
          // if (!connectedWatchName)
          setRefreshLoader(false);
        },
      }),
    );
  }

  const getGarminData = useCallback(
    (setLoading = true) => {
      if (garminToken) {
        setIsPullToRef(setLoading);
        getAllGarminData(garminToken, () => {
          setIsPullToRef(false);
          setRefreshLoader(false);
        });
      }
    },
    [dispatch, garminToken],
  );

  const renderConnectedWatch = () => {
    return (
      <View style={styles.connectWatchViewMain}>
        <View
          style={[
            AppStyles.flex,
            AppStyles.flexRow,
            {justifyContent: 'space-between'},
          ]}>
          <Text
            color={Colors.black}
            numberOfLines={1}
            ellipsizeMode="tail"
            type={Fonts.type.base}
            size={Fonts.size.large}
            style={{fontWeight: '600', height: 25}}>
            {userData?.fullname ? ` Hey ${userData?.fullname} !` : ''}
          </Text>

          <ButtonView onPress={refreshButtonPress}>
            {refreshLoader && <ActivityIndicator size={'small'} />}
            {!refreshLoader && (
              <Image source={Images.Refresh} style={{height: 20, width: 20}} />
            )}
          </ButtonView>
        </View>
        <TouchableOpacity
          onPress={() => {
            isActive
              ? setIsWatchModalVisible(true)
              : navigate.navigate('watchConnect', {setIsActive});
          }}
          style={styles.connectWatchView}>
          <View style={styles.connectInnerView}>
            {isActive ? (
              <>
                <View style={styles.appleView}>
                  <Image
                    source={
                      connectedWatchName == connectedWatch.GRAMIN
                        ? Images.Garmin
                        : Images.Apple
                    }
                    style={
                      connectedWatchName == connectedWatch.GRAMIN
                        ? {width: 21, height: 19}
                        : {width: 19, height: 23}
                    }
                  />
                </View>
                <View style={AppStyles.mLeft15}>
                  <Text
                    color={Colors.white}
                    type={Fonts.type.base}
                    size={Fonts.size.xSmall}
                    style={{fontWeight: '400'}}>
                    {connectedWatchName == connectedWatch.GRAMIN
                      ? 'Connected with Garmin'
                      : 'Connected with Apple'}
                  </Text>
                  <Text
                    color={Colors.white}
                    type={Fonts.type.base}
                    size={Fonts.size.xSmall}
                    style={{fontWeight: '400', marginTop: 5}}>
                    Tap to disconnect
                  </Text>
                </View>
              </>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                  // width: '',
                  marginHorizontal: 30,
                }}>
                <Image
                  source={Images.unSelectedPin}
                  style={{width: 19, height: 20}}
                />

                <Text
                  color={Colors.white}
                  type={Fonts.type.base}
                  size={Fonts.size.xSmall}
                  style={{fontWeight: '400', marginLeft: 20}}>
                  Tap to connect your watch
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  async function onPressActivities(title) {
    const screenToNavigate =
      connectedWatchName === connectedWatch?.GRAMIN
        ? 'individualActivityGarmin'
        : 'individualActivity';

    if (title == 'VO2 MAX') {
      navigate.navigate(screenToNavigate, {
        item: {
          image: Images.Vo2Max,
          imageStyle: {width: 21, height: 22},
          title: 'VO2 MAX',
          color: 'rgba(13, 130, 255, 1)',
          unit: 'ml',
        },
        value: 86,
        imageSytle: {width: 20, height: 17},
      });
    } else if (title == 'HRV') {
      navigate.navigate(screenToNavigate, {
        item: {
          image: Images.HRV,
          imageStyle: {width: 32, height: 24},
          title: 'HRV',
          color: 'rgba(13, 130, 255, 1)',
          unit: 'ms',
        },
        value: 50,
        imageSytle: {width: 20, height: 17},
      });
    } else if (title == 'SLEEP') {
      navigate.navigate(screenToNavigate, {
        item: {
          image: Images.SleepHrs,
          imageStyle: {width: 28, height: 22},
          title: 'SLEEP',
          color: 'rgba(13, 130, 255, 1)',
          unit: 'hours',
        },
        value: 2.3,
        imageSytle: {width: 20, height: 17},
      });
    }
  }

  const renderActivies = () => {
    return (
      <View style={styles.activitiesView}>
        <View style={styles.ActivitiesItemView}>
          <ActivitiesItemDash
            title="HRV"
            image={Images.HRV}
            imageStyle={{width: 34.14, height: 27.17}}
            txtColor={Colors.text.theme}
            value={
              connectedWatchName == connectedWatch.GRAMIN
                ? garminData?.hrv
                : appleData?.hrv
            }
            unit="ms"
            isActive={isActive}
            onPress={onPressActivities}
          />
          <View style={styles.separaterView} />
          <ActivitiesItemDash
            title="SLEEP"
            image={Images.SleepHrs}
            imageStyle={{width: 34, height: 29.1}}
            txtColor={Colors.text.theme}
            value={
              connectedWatchName == connectedWatch.GRAMIN
                ? garminData?.sleep?.sleep_value ?? 0
                : appleData.SleepHrs
            }
            unit="hours"
            isActive={isActive}
            onPress={onPressActivities}
          />
          <View style={styles.separaterView} />
          <ActivitiesItemDash
            title="VO2 MAX"
            image={Images.Vo2Max}
            imageStyle={{width: 34, height: 34}}
            txtColor={Colors.text.theme}
            value={
              connectedWatchName == connectedWatch.GRAMIN
                ? garminData?.vo2Max
                : appleData.vo2Max
            }
            unit="ml"
            isActive={isActive}
            onPress={onPressActivities}
          />
        </View>
      </View>
    );
  };

  function onPressActivityIem(title) {
    const screenToNavigate =
      connectedWatchName === connectedWatch?.GRAMIN
        ? 'individualActivityGarmin'
        : 'individualActivity';

    if (title == 'CALORIES') {
      navigate.navigate(screenToNavigate, {
        item: {
          image: Images.Calories,
          imageStyle: {width: 17, height: 17},
          title: 'CALORIES',
          color: 'rgba(13, 130, 255, 1)',
          unit: 'Kcal',
        },
        value: 86,
        imageSytle: {width: 20, height: 17},
      });
    } else if (title == 'STEPS') {
      const screenName =
        connectedWatchName == connectedWatch?.GRAMIN
          ? 'individualActivityGarmin'
          : 'individualActivity';

      navigate.navigate(screenName, {
        item: {
          image: Images.Steps2,
          imageStyle: {width: 23.2, height: 16},
          title: 'STEPS',
          color: 'rgba(13, 130, 255, 1)',
          unit: '',
        },
        value: 50,
        imageSytle: {width: 20, height: 17},
      });
    } else if (title == 'INTENSITY MINUTES') {
      navigate.navigate(screenToNavigate, {
        item: {
          image: Images.Intensity,
          imageStyle: {width: 23, height: 23},
          title: 'INTENSITY MINUTES',
          color: 'rgba(13, 130, 255, 1)',
          unit: 'min',
        },
        value: 6,
        imageSytle: {width: 20, height: 17},
      });
    } else if (title == 'RESTING HEART Rt.') {
      navigate.navigate(screenToNavigate, {
        item: {
          image: Images.HeartRate,
          imageStyle: {width: 20, height: 17},
          title: 'RESTING HEART Rt.',
          color: 'rgba(13, 130, 255, 1)',
          unit: 'bpm',
        },
        value: 6,
        imageSytle: {width: 20, height: 17},
      });
    }
  }

  const renderActivitiesItem = () => {
    return (
      <View style={{marginTop: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ActivitiesItem
            value={
              connectedWatchName == connectedWatch.GRAMIN
                ? garminData?.calories?.calories_value
                : parseInt(appleData.Calories?.toFixed(2)) || 0
            }
            unit="Kcal"
            title="CALORIES"
            image={Images.Calories}
            imageStyle={{width: 62, height: 62}}
            isActive={isActive}
            onPress={onPressActivityIem}
          />
          <ActivitiesItem
            value={
              connectedWatchName == connectedWatch.GRAMIN
                ? garminData?.steps
                : appleData?.StepsCount
            }
            unit=""
            title="STEPS"
            image={Images.Steps2}
            imageStyle={{width: 63.1, height: 48.45}}
            isActive={isActive}
            onPress={onPressActivityIem}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <ActivitiesItem
            value={
              connectedWatchName == connectedWatch.GRAMIN
                ? garminData?.intensity
                : appleData?.Intensity
            }
            unit="min"
            title="INTENSITY MINUTES"
            image={Images.FloorClimb}
            imageStyle={{width: 59, height: 59}}
            isActive={isActive}
            onPress={onPressActivityIem}
          />
          <ActivitiesItem
            value={
              connectedWatchName == connectedWatch.GRAMIN
                ? garminData?.restingHeartRate
                : appleData?.heartRate
            }
            unit="bpm"
            title="RESTING HEART Rt."
            image={Images.HeartRate}
            imageStyle={{width: 66, height: 56}}
            isActive={isActive}
            onPress={onPressActivityIem}
          />
        </View>
      </View>
    );
  };

  const renderPoint = () => {
    return (
      <Points
        targetPoint={dailyPoints?.total}
        earnPoint={dailyPoints?.earned}
        isActive={isActive}
      />
    );
  };
  const renderPointswithouTarget = () => {
    return (
      <PointswithouTarget
        targetPoint={dailyPoints?.total}
        earnPoint={dailyPoints?.earned}
        isActive={true}
      />
    );
  };

  const renderPoints = useMemo(() => {
    return isActive ? renderPoint() : renderPointswithouTarget();
  }, [
    isActive,
    userData,
    appleData,
    connectedWatchName,
    garminData,
    isWatchConnected,
    garminToken,
    dailyPoints,
  ]);

  const renderActivityMins = () => {
    return (
      <View>
        <ActivityMins isActive={isActive} />
      </View>
    );
  };

  const renderYourWeeklyActivity = () => {
    return (
      <View style={AppStyles.mBottom10}>
        <WeeklyActivity isActive={isActive} />
      </View>
    );
  };

  const renderSetGoals = () => {
    return (
      <ButtonView
        style={[
          styles.pizzeWrapper,
          AppStyles.themeShadow,
          AppStyles.flexRow,
          AppStyles.spaceBetween,
          AppStyles.alignItemsCenter,
        ]}
        onPress={() => navigate.navigate(SCREENS.HOME.setTarget)}>
        <View>
          <Text size={Fonts.size.xNormal} type="semiBold">
            Set Target
          </Text>

          <Text
            size={Fonts.size.xxxxxSmall}
            type="normal"
            style={AppStyles.mTop5}>
            Set your goals
          </Text>
        </View>

        <Image
          source={Images.Target}
          style={{height: 34, width: 34}}
          resizeMode="contain"
        />
      </ButtonView>
    );
  };

  const renderPizzaSliceInfo = () => {
    const calories =
      connectedWatchName == connectedWatch.GRAMIN
        ? garminData?.calories?.calories_value
        : appleData?.Calories;

    let pizzaSlice = 0;

    if (calories) {
      pizzaSlice = calories / 300;
      pizzaSlice = parseFloat(pizzaSlice?.toFixed(2));
    }
    return (
      <View style={[styles.pizzeWrapper, AppStyles.themeShadow]}>
        <ButtonView
          style={[
            AppStyles.flexRow,
            AppStyles.alignItemsCenter,
            AppStyles.spaceBetween,
          ]}
          onPress={() => setCollapsed(!collapsed)}>
          <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
            <Image source={Images.Slice} style={{height: 34, width: 34}} />

            <View style={AppStyles.mLeft10}>
              <Text size={Fonts.size.xNormal} type="semiBold">
                {pizzaSlice ?? 0} Pizza Slices
              </Text>
            </View>
          </View>

          <Image
            source={Images.Info}
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              paddingRight: 5,
              tintColor: Colors.background.primary,
            }}
          />
        </ButtonView>

        <AwesomeAlert
          show={collapsed}
          showProgress={false}
          title="Info"
          animatedValue={0.1}
          message={`${pizzaSlice} slice is equal to ${
            calories?.toFixed(2) || 0
          } calories`}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={false}
          cancelText="Ok"
          cancelButtonColor={Colors.background.primary}
          onCancelPressed={() => {
            setCollapsed(false);
          }}
          onDismiss={() => {
            setCollapsed(false);
          }}
        />
      </View>
    );
  };

  const renderLeaderboard = () => {
    return <Leaderboard />;
  };

  const renderOngoingTasks = () => {
    return <OngoingTasks />;
  };

  const renderModal = () => {
    return (
      <>
        <ModalCancel
          title="Are you sure to remove the watch"
          isVisible={isWatchModalVisible}
          setVisible={setIsWatchModalVisible}
          setIsActive={() => {
            if (connectedWatchName === connectedWatch.GRAMIN) {
              dispatch(
                deleteGarminUserRequest({
                  payloadData: {
                    id: garminToken?.id,
                  },
                  responseCallback: () => {},
                }),
              );
            } else {
              // dispatch(watchConnectedreducer(false));
              dispatch(
                connectAppleWatchRequest({
                  params: userData?.id,
                  payloadData: {
                    apple_connected: false,
                  },
                  responseCallback: () => {},
                }),
              );
            }
          }}
          actionTitle={'Remove'}
        />
      </>
    );
  };

  const renderCaloriesRemainingDashboard = () => {
    return <CaloriesRemainingDashboard />;
  };

  return (
    <View style={styles.container}>
      {renderCustomNav}

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isPullToref}
            onRefresh={() => {
              pullToRefresh();
            }}
          />
        }
        style={[AppStyles.flex, {width: '100%'}]}
        showsVerticalScrollIndicator={false}>
        {renderConnectedWatch()}

        {isLoading && (
          <ActivityIndicator size={'small'} style={AppStyles.mTop15} />
        )}

        {!isLoading && (
          <>
            {isActive && (
              <>
                {renderActivitiesItem()}
                {renderCaloriesRemainingDashboard()}
                {renderPizzaSliceInfo()}
                {renderSetGoals()}
                {renderActivies()}
                {/* {renderSteps()} */}
              </>
            )}
            {!pointsLoading && renderPoints}
            {/* {renderActivityMins()} */}
            {isActive && renderYourWeeklyActivity()}
            {ongoingTasks?.length > 0 && renderOngoingTasks()}
            {ongoingLeaderboard?.length > 0 && renderLeaderboard()}
            {isWatchModalVisible && renderModal()}
          </>
        )}
      </ScrollView>
    </View>
  );
}
