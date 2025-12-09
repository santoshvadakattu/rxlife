import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {
  CustomNavbar,
  EmptyList,
  FriendRequestItem,
  Text,
} from '../../components';
import {Colors, Images} from '../../theme';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  acceptFriendRequestRequest,
  getFriendsRequestRequest,
  rejectFriendRequestRequest,
} from '../../redux/slicers/friends';
import {manipulateUserDataFromRequestUser} from '../../Helper/friendsMainpulator';
import util from '../../util';
import {strings} from '../../constants';

export default function FriendRequest({route}) {
  // const {date} = route.params;
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [friendsRequestData, setFriendsRequestData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isPullToref, setIsPullToref] = useState(false);
  const {userData} = useSelector((state) => state.user);
  const {friendRequest} = useSelector((state) => state.friends);
  const isFocused = useIsFocused();
  useEffect(() => {
    setIsloading(true);
    const payload = {
      userId: userData.id,
    };
    dispatch(
      getFriendsRequestRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          setIsloading(false);
          if (status) {
            setFriendsRequestData(manipulateUserDataFromRequestUser(response));
          }
        },
      }),
    );
  }, [isFocused]);
  function pullToRefresh() {
    setIsPullToref(true);
    const payload = {
      userId: userData.id,
    };
    dispatch(
      getFriendsRequestRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          setIsPullToref(false);
          if (status) {
            setFriendsRequestData(manipulateUserDataFromRequestUser(response));
          }
        },
      }),
    );
  }
  function acceptRequest(id) {
    const payload = {
      data: {
        id: id,
      },
      userId: userData.id,
    };
    dispatch(
      acceptFriendRequestRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          if (status) {
            let tempArr = util.cloneDeep(friendsRequestData);
            tempArr = tempArr.filter(
              (item) => item.id != response.data.data.id,
            );
            setFriendsRequestData(tempArr);
          }
        },
      }),
    );
  }
  function rejectRequest(id) {
    const payload = {
      data: {
        requests: {
          disconnect: [
            {
              id: id,
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
            let tempArr = util.cloneDeep(friendsRequestData);
            tempArr = tempArr.filter((item) => item.id != id);
            setFriendsRequestData(tempArr);
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
        title={'Friends Request'}
      />
    );
  }, []);

  const renderFriendRequestList = useMemo(() => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginTop: 25}}
        contentContainerStyle={{flexGrow: 1}}
        data={friendsRequestData.reverse()}
        refreshControl={
          <RefreshControl
            refreshing={isPullToref}
            onRefresh={() => {
              pullToRefresh();
            }}
          />
        }
        renderItem={({item}) => {
          return (
            <FriendRequestItem
              item={item}
              onPressAccept={acceptRequest}
              onPressReject={rejectRequest}
            />
          );
        }}
        ListEmptyComponent={EmptyList}
        // ListEmptyComponent={() => {
        //   return (
        //     <View
        //       style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //       <Text>{strings.FRIEND_REQUEST_EMPTY}</Text>
        //     </View>
        //   );
        // }}
      />
    );
  }, [friendsRequestData]);
  return (
    <View style={styles.container}>
      {renderCustomNav}
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        renderFriendRequestList
      )}
    </View>
  );
}
