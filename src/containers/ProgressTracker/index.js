import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  CustomNavbar,
  StatisticsBarChart,
  StatisticsList,
  Text,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {
  DrawerActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDailyPointsRequest,
  getGraphViewRequest,
  getStatisticsRequest,
} from '../../redux/slicers/user';
import moment from 'moment';
import {SCREENS} from '../../constants';
import {getUnReadChatRequest} from '../../redux/slicers/chat';

export default function ProgressTracker() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [statisticsData, setStatisticsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [totalPoints, setTotalPoints] = useState(0);

  const {dailyPoints, userData} = useSelector((state) => state?.user);
  const {isUnread} = useSelector((state) => state?.chat);

  useEffect(() => {
    if (!isFocused) return;

    setIsLoading(true);

    dispatch(
      getStatisticsRequest({
        payloadData: {
          query: '',
        },
        responseCallback: (status, res) => {
          if (status) {
            setStatisticsData(res);
          }
        },
      }),
    );

    dispatch(
      getGraphViewRequest({
        responseCallback: (status, res) => {
          if (status) {
            if (res?.graphData?.length > 0) {
              const endResult = [];
              const days = [];

              for (let point of res?.graphData) {
                endResult.push(point?.earned ?? 0);
                days.push(point?.day);
              }

              setData({
                labels: days,
                datasets: [
                  {
                    data: endResult,
                  },
                ],
              });
            }

            setTotalPoints(res?.earned ?? 0);
          }
          setIsLoading(false);
        },
      }),
    );

    dispatch(
      getDailyPointsRequest({
        responseCallback: () => {
          // setPointsLoading(false);
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
  }, [isFocused]);

  const openDrawer = () => {
    navigate.dispatch(DrawerActions.openDrawer());
  };

  const renderTitle = () => {
    return (
      <View style={{marginTop: 10}}>
        <Text
          color={Colors.black2}
          type={Fonts.type.base}
          size={Fonts.size.xSmall}
          style={{fontWeight: '600', lineHeight: 21}}>
          {moment().format('dddd, MMMM DD')}
        </Text>
        <Text
          color={Colors.black2}
          type={Fonts.type.base}
          size={Fonts.size.large}
          style={{fontWeight: '600', lineHeight: 30}}>
          Progress Tracker
        </Text>
      </View>
    );
  };

  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title={'Progress Tracker'}
        rightBtnImage={Images.Notification}
        rightBtnImageSecond={Images.Chat}
        leftBtnImage={Images.Drawer}
        leftBtnPress={openDrawer}
        rightBtnPressSecond={() => {
          navigate.navigate(SCREENS.HOME.chatList);
        }}
        rightBtnPress={() => navigate.navigate('notification')}
        notificationCount={userData?.notificationCount}
        isUnread={isUnread}
      />
    );
  }, [userData?.notificationCount, isUnread]);

  const renderBonusBG = () => {
    return (
      <View style={{width: '100%'}}>
        <ImageBackground
          style={{
            height: 112,
            justifyContent: 'center',
            marginTop: 15,
          }}
          resizeMode="stretch"
          source={Images.TrackerChallengBG}>
          <View style={{paddingLeft: 20}}>
            <Text
              type={Fonts.type.base}
              color={Colors.white}
              size={Fonts.size.xSmall}
              style={{fontWeight: '400', lineHeight: 21}}>
              {dailyPoints?.earned > 0 ? dailyPoints?.earned : 'No'} Bonus
              Points for the day
            </Text>
            <Text
              type={Fonts.type.base}
              color={Colors.white}
              size={Fonts.size.large}
              style={{fontWeight: '600', lineHeight: 32}}>
              {statisticsData?.dailyChallengesStreak ?? 0} Daily Challenge
              Streak
            </Text>
            <Text
              type={Fonts.type.base}
              color={Colors.white}
              size={Fonts.size.xSmall}
              style={{fontWeight: '400', lineHeight: 21}}>
              You're on a role. Keep it up!
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  // const renderPonitBG = () => {
  //   return (
  //     <ImageBackground
  //       style={{
  //         height: 99,
  //         justifyContent: 'center',
  //         marginTop: 15,
  //       }}
  //       resizeMode="stretch"
  //       source={Images.TrackerPointBG}>
  //       <View style={{alignItems: 'center'}}>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             justifyContent: 'space-between',
  //             width: 100,
  //           }}>
  //           <Text
  //             type={Fonts.type.base}
  //             color={Colors.white}
  //             size={Fonts.size.xLarge}
  //             style={{fontWeight: '600', lineHeight: 50}}>
  //             1256
  //           </Text>
  //           <Image source={Images.PointLogo} style={{width: 33, height: 33}} />
  //         </View>

  //         <Text
  //           type={Fonts.type.base}
  //           color={Colors.white}
  //           size={Fonts.size.xSmall}
  //           style={{fontWeight: '400'}}>
  //           Points Earns
  //         </Text>
  //       </View>
  //     </ImageBackground>
  //   );
  // };

  function onPress(item) {
    if (item.title == 'Days Active') {
      navigate.navigate('statisticsChart', {item});
    } else if (item.title == 'Challenges Completed') {
      navigate.navigate('statisticsChart', {item});
    }
  }

  const renderStatisticsList = () => {
    return (
      <View style={{marginTop: 30}}>
        <StatisticsList
          // style={{height: 300}}
          onPress={onPress}
          data={statisticsData}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCustomNav}

      {isLoading && (
        <ActivityIndicator size={'large'} style={AppStyles.mTop15} />
      )}

      {!isLoading && (
        <>
          {renderTitle()}
          <ScrollView
            style={{marginBottom: 20, flex: 1}}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}>
            {renderBonusBG()}

            <StatisticsBarChart
              title={'Points Earn'}
              des={totalPoints}
              color={Colors.background.primary}
              data={data}
            />

            {/* {renderPonitBG()} */}
            {renderStatisticsList()}
          </ScrollView>
        </>
      )}
    </View>
  );
}
