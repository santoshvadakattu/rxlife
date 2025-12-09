import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  Button,
  CustomNavbar,
  EmptyList,
  FriendRequestItem,
  FriendsItem,
  Text,
} from '../../components';
import {Colors, Images} from '../../theme';
import styles from './styles';
import {SCREENS, strings} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFriendsRequest,
  reducderAfterUnfriend,
  unFriendRequestRequest,
} from '../../redux/slicers/friends';

export default function Friends() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.user);
  const {friends} = useSelector((state) => state.friends);
  const [isLoading, setIsloading] = useState(false);
  const [isPullToref, setIsPullToref] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    setIsloading(true);
    const payload = {
      userId: userData.id,
    };
    dispatch(
      getFriendsRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          setIsloading(false);
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
      getFriendsRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          setIsPullToref(false);
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
        title={'Friends'}
      />
    );
  }, []);

  function onPressUnFriend(friendId) {
    const payload = {
      data: {
        id: friendId,
      },
      userId: userData.id,
    };
    dispatch(
      unFriendRequestRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          if (status) {
            dispatch(reducderAfterUnfriend(response.data.data));
          }
        },
      }),
    );
  }

  const renderFriendsList = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginVertical: 25, flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={isPullToref}
            onRefresh={() => {
              pullToRefresh();
            }}
          />
        }
        contentContainerStyle={{flexGrow: 1}}
        data={friends}
        renderItem={({item}) => {
          return <FriendsItem item={item} onPressUnFriend={onPressUnFriend} />;
        }}
        ListEmptyComponent={EmptyList}
        // ListEmptyComponent={() => {
        //   return (
        //     <View
        //       style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //       <Text>{strings.FRIEND_EMPTY}</Text>
        //     </View>
        //   );
        // }}
      />
    );
  };
  return (
    <View style={styles.container}>
      {renderCustomNav}
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        renderFriendsList()
      )}
      <Button
        onPress={() => navigate.navigate(SCREENS.HOME.addFriends)}
        title={'Add Friends'}
        style={styles.btnStyle}
        textStyle={styles.txtStyle}
      />
    </View>
  );
}
