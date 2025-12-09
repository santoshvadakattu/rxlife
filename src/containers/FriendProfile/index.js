import {ActivityIndicator, ScrollView, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {
  ChallengeStreak,
  CustomNavbar,
  ProfileComponentFriend,
  StatisticsList,
} from '../../components';
import {AppStyles, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  acceptFriendRequestRequest,
  getFriendsViewProfileRequest,
  reducerAfterRequestSend,
  reducerAfterUnRequestSend,
  rejectFriendRequestRequest,
  removeRequestRequest,
  sendFriendRequestRequest,
  unFriendRequestRequest,
} from '../../redux/slicers/friends';
import {manipulateUserDataFromViewProfileUser} from '../../Helper/friendsMainpulator';
import {
  getDailyPointsRequest,
  getStatisticsRequest,
} from '../../redux/slicers/user';
import {loadRoomRequest} from '../../redux/slicers/chat';
import {SCREENS} from '../../constants';

export default function FriendProfile({route}) {
  const {userId} = route.params || {};
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [friendProfile, setfriendProfile] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [statisticsData, setStatisticsData] = useState({});
  const [txtRequest, setTxtRequest] = useState('Sent Request');
  const [friendTodayEarnedPoints, setFriendTodayEarnedPoints] = useState(0);
  const {userData} = useSelector((state) => state.user);

  useEffect(() => {
    setTxtRequest(
      friendProfile.isRequestSent ? 'Cancel Request' : 'Send Request',
    );
  }, [friendProfile]);

  useEffect(() => {
    setIsLoader(true);
    const payload = {
      userId: userId,
    };
    dispatch(
      getFriendsViewProfileRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          setIsLoader(false);

          if (status) {
            setfriendProfile(
              manipulateUserDataFromViewProfileUser(response, userData.id),
            );
          }
        },
      }),
    );

    dispatch(
      getStatisticsRequest({
        payloadData: {
          query: `userId=${userId}`,
        },
        responseCallback: (status, res) => {
          if (status) {
            setStatisticsData(res);
          }
        },
      }),
    );

    dispatch(
      getDailyPointsRequest({
        payloadData: {},
        query: `userId=${userId}`,
        responseCallback: (status, res) => {
          if (status) setFriendTodayEarnedPoints(res?.earned ?? 0);
          else setFriendTodayEarnedPoints(0);
        },
      }),
    );
  }, [userId]);

  const handleLoadRoom = () => {
    const payload = {
      receiverID: friendProfile?.chatUserId,
      senderID: userData?.chatUserId,
      room_type: 'individual',
    };

    dispatch(
      loadRoomRequest({
        payloadData: payload,
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: (status) => {
          if (status) {
            navigate.navigate(SCREENS.HOME.chat);
          }
        },
      }),
    );
  };

  function sendRequest() {
    if (!friendProfile.isRequestSent) {
      //sent request
      const payload = {
        data: {
          requests: {
            connect: [
              {
                id: userData.id,
              },
            ],
          },
          isRequested: true,
        },
        senderId: friendProfile.id,
      };
      dispatch(
        sendFriendRequestRequest({
          payloadData: payload,
          responseCallback: (status, response) => {
            if (status) {
              setTxtRequest('sent Request');
              dispatch(reducerAfterRequestSend(friendProfile));
              setfriendProfile({...friendProfile, isRequestSent: true});
            }
          },
        }),
      );
    } else {
      //unrequest
      const payload = {
        data: {
          requests: {
            disconnect: [
              {
                id: userData.id,
              },
            ],
          },
        },
        senderId: friendProfile.id,
      };
      dispatch(
        removeRequestRequest({
          payloadData: payload,
          responseCallback: (status, response) => {
            if (status) {
              setTxtRequest('send Request');
              dispatch(reducerAfterUnRequestSend(friendProfile));
              setfriendProfile({...friendProfile, isRequestSent: false});
            }
          },
        }),
      );
    }
  }

  function acceptRequest() {
    const payload = {
      data: {
        id: friendProfile?.id,
      },
      userId: userData.id,
    };
    dispatch(
      acceptFriendRequestRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          if (status) {
            setfriendProfile({
              ...friendProfile,
              request: false,
              friend: true,
            });
          }
        },
      }),
    );
  }
  function rejectRequest() {
    const payload = {
      data: {
        requests: {
          disconnect: [
            {
              id: friendProfile?.id,
            },
          ],
        },
      },
      userId: userData.id,
    };
    dispatch(
      rejectFriendRequestRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          if (status) {
            setfriendProfile({
              ...friendProfile,
              request: false,
              friend: false,
            });
          }
        },
      }),
    );
  }

  function onPressUnFriend() {
    const payload = {
      data: {
        id: friendProfile?.id,
      },
      userId: userData.id,
    };
    dispatch(
      unFriendRequestRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          if (status) {
            setfriendProfile({
              ...friendProfile,
              request: false,
              friend: false,
            });
          }
        },
      }),
    );
  }

  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
        title={'Friend Profile'}
      />
    );
  }, []);

  const renderProfilePicComponent = () => {
    return (
      <ProfileComponentFriend
        positiveTxt={
          friendProfile?.friend
            ? 'Message'
            : friendProfile?.request
            ? 'Accept'
            : ''
        }
        nagetiveTxt={
          friendProfile?.friend
            ? 'Unfriend'
            : friendProfile?.request
            ? 'Reject'
            : ''
        }
        isFriendProfile={friendProfile?.friend || friendProfile?.request}
        singleBtnTxt={txtRequest}
        friendProfile={friendProfile}
        onPressSingleBtn={sendRequest}
        positiveOnpress={
          friendProfile?.friend
            ? handleLoadRoom
            : friendProfile?.request
            ? acceptRequest
            : ''
        }
        nagetiveOnpress={
          friendProfile?.friend
            ? onPressUnFriend
            : friendProfile?.request
            ? rejectRequest
            : ''
        }
        friendId={userId}
        isLoader={isLoader}
      />
    );
  };

  const renderStatistic = () => {
    return (
      <View style={{marginTop: 15}}>
        <StatisticsList
          onPress={() => {}}
          data={statisticsData}
          // style={{height: 330}}
        />
      </View>
    );
  };

  const renderStreakChallenge = () => {
    return (
      <View style={{marginTop: 15}}>
        <ChallengeStreak
          points={friendTodayEarnedPoints}
          streak={statisticsData?.dailyChallengesStreak ?? 0}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCustomNav}
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        {isLoader && (
          <ActivityIndicator size={'large'} style={AppStyles.mTop15} />
        )}

        {!isLoader && (
          <>
            {renderProfilePicComponent()}
            {(friendProfile?.friend || friendProfile?.request) &&
              renderStreakChallenge()}
            {renderStatistic()}
          </>
        )}
      </ScrollView>
    </View>
  );
}
