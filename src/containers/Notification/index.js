import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {CustomNavbar, EmptyList, NotificationItem} from '../../components';
import {AppStyles, Images} from '../../theme';
import style from './styles';
import {
  NOTIFICATION_TYPES_TEXT,
  SCREENS,
  notificaitonListing,
} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getNotificationsListPaginationRequest,
  getNotificationsListRequest,
  readNotificationRequest,
} from '../../redux/slicers/notification';
import {resetNotificationCountRequest} from '../../redux/slicers/user';

export default function Notification() {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const {userData} = useSelector((state) => state.user);
  const {notifications, total} = useSelector((state) => state.notification);
  const [isPullToRef, setIsPullToRef] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initialRequest();
  }, []);

  const initialRequest = () => {
    dispatch(
      getNotificationsListRequest({
        payloadData: {
          query: `filters[user][id][$eq]=${userData?.id}&populate=*&pagination[limit]=15&sort=createdAt:desc`,
        },

        responseCallback: () => {
          setIsLoading(false);
          setIsPullToRef(false);
        },
      }),
    );

    dispatch(
      resetNotificationCountRequest({
        params: userData?.id,
        payloadData: {
          notificationCount: 0,
        },
        responseCallback: () => {},
      }),
    );
  };

  const pullToRefresh = () => {
    setIsPullToRef(true);

    initialRequest();
  };

  const getMoreNotifications = () => {
    if (notifications?.length < total)
      dispatch(
        getNotificationsListPaginationRequest({
          payloadData: {
            query: `filters[user][id][$eq]=${userData?.id}&populate=*&pagination[limit]=15&pagination[start]=${notifications?.length}&sort=createdAt:desc`,
          },

          responseCallback: () => {},
        }),
      );
  };

  const handleNotificationPressed = (item) => {
    // dispatch()
    if (!item?.isRead)
      dispatch(
        readNotificationRequest({
          payloadData: {
            data: {
              isRead: true,
            },
          },
          params: item?.id,
          responseCallback: () => {},
        }),
      );

    if (item?.notType === NOTIFICATION_TYPES_TEXT.friendInvitation) {
      navigate.navigate(SCREENS.HOME.friendProfile, {
        userId: item?.entity,
      });
    }

    if (item?.notType === NOTIFICATION_TYPES_TEXT.challengeReminder) {
      navigate.navigate(SCREENS.HOME.challengeDetail, {
        challengeId: item?.entity,
        myChallenge: true,
        fromNotification: true,
      });
    }

    if (item?.notType === NOTIFICATION_TYPES_TEXT.upcomingChallenges) {
      navigate.navigate(SCREENS.HOME.challengeDetail, {
        challengeId: item?.entity,
        myChallenge: false,
        fromNotification: true,
      });
    }
  };

  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        title={'Notification'}
        hasBorder={false}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
      />
    );
  }, []);

  const renderNotification = () => {
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isPullToRef}
            onRefresh={() => {
              pullToRefresh();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 0, flex: 1}}
        data={notifications}
        contentContainerStyle={{flexGrow: 1, marginTop: 15}}
        onEndReached={getMoreNotifications}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => {
          return (
            <NotificationItem
              item={item}
              onPress={() => handleNotificationPressed(item)}
            />
          );
        }}
        ListEmptyComponent={EmptyList}
      />
    );
  };

  return (
    <View style={style.container}>
      {renderCustomNav}
      {isLoading && (
        <ActivityIndicator size={'large'} style={[AppStyles.mTop15]} />
      )}
      {!isLoading && renderNotification()}
    </View>
  );
}
