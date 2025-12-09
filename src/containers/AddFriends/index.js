import {FlatList, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  AddFriendsItem,
  CustomNavbar,
  EmptyList,
  SearchInput,
  Text,
} from '../../components';
import {Images} from '../../theme';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSearchFriendsRequest,
  reducerAfterRequestSend,
  reducerAfterUnRequestSend,
  removeRequestRequest,
  removeSearchFriends,
  sendFriendRequestRequest,
} from '../../redux/slicers/friends';
import {manipulateUserDataFromSearchUser} from '../../Helper/friendsMainpulator';
import util from '../../util';
import {strings} from '../../constants';

export default function AddFriends() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.user);
  const {searchFriends} = useSelector((state) => state.friends);

  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(removeSearchFriends([]));
  }, []);
  function setSearchText(text) {
    setText(text);
    const payload = {
      text: text,
      userId: userData.id,
    };
    dispatch(
      getSearchFriendsRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          if (status) {
            setData(manipulateUserDataFromSearchUser(response, userData.id));
          }
        },
      }),
    );
  }

  function sendRequest(item) {
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
      senderId: item.id,
    };
    dispatch(
      sendFriendRequestRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          if (status) {
            dispatch(reducerAfterRequestSend(item));
          }
        },
      }),
    );
  }
  function removeRequest(item) {
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
      senderId: item.id,
    };
    dispatch(
      removeRequestRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          if (status) {
            dispatch(reducerAfterUnRequestSend(item));
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
        title={'Add Friends'}
      />
    );
  }, []);

  const renderSearch = () => {
    return (
      <View style={{marginTop: 10}}>
        <SearchInput
          setText={setSearchText}
          text={text}
          placeholder={'Search Friend'}
        />
      </View>
    );
  };
  const renderFriendsList = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginVertical: 25}}
        contentContainerStyle={{flexGrow: 1}}
        data={searchFriends}
        renderItem={({item}) => {
          return (
            <AddFriendsItem
              item={item}
              sendRequest={sendRequest}
              removeRequest={removeRequest}
            />
          );
        }}
        ListEmptyComponent={EmptyList}
        // ListEmptyComponent={() => {
        //   return (
        //     <View
        //       style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //       {!util.isEmptyValue(text) && (
        //         <Text>{strings.NO_RESULT_FOUND}</Text>
        //       )}
        //     </View>
        //   );
        // }}
      />
    );
  };
  return (
    <View style={styles.container}>
      {renderCustomNav}
      {renderSearch()}
      {renderFriendsList()}
    </View>
  );
}
