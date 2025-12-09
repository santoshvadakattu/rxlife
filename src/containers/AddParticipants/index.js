import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {
  Button,
  ButtonView,
  CustomNavbar,
  EmptyList,
  KeyboardAwareScrollViewComponent,
  Text,
  TextInput,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {DisplayBottom} from '../../Partials';
import Participant from '../../components/Participant';
import {useDispatch, useSelector} from 'react-redux';
import {
  addMoreParticipantRequest,
  addUserInSelectedList,
  emptySelectedUsers,
  getAllUsersRequest,
  getMoreUsersRequest,
  removeUserFromSelectedList,
} from '../../redux/slicers/chat';

const AddParticipants = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const {userData} = useSelector((state) => state?.user);
  const {selectedGroupUsers, allUsers, selectedRoom} = useSelector(
    (state) => state?.chat,
  );

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const searchRef = useRef(null);

  useEffect(() => {
    dispatch(
      getAllUsersRequest({
        payloadData: {
          fromAddParticipants: true,
          query: `limit=${20}&offset=${0}&room_id=${selectedRoom?.id}`,
        },
        responseCallback: () => {
          setIsLoading(false);
        },
      }),
    );
  }, []);

  const getMoreParticipants = () => {
    if (isLoading) return;

    let queryPayload = `limit=${20}&offset=${allUsers?.length}&room_id=${
      selectedRoom?.id
    }`;
    if (query) {
      queryPayload += `&search=${query}`;
    }

    dispatch(
      getMoreUsersRequest({
        payloadData: {
          fromAddParticipants: true,
          query: queryPayload,
        },
      }),
    );
  };

  const handleOnPressUser = (user) => {
    const findUser = selectedGroupUsers?.find((item) => item?.id == user?.id);

    if (findUser) {
      dispatch(removeUserFromSelectedList(user));
    } else dispatch(addUserInSelectedList(user));
  };

  const handleChangeQuery = (text) => {
    setQuery(text);

    if (searchRef?.current) {
      clearTimeout(searchRef?.current);
    }

    searchRef.current = setTimeout(() => {
      dispatch(
        getAllUsersRequest({
          payloadData: {
            fromAddParticipants: true,
            query: `limit=${5}&offset=${0}&search=${text}&room_id=${
              selectedRoom?.id
            }`,
          },
        }),
      );
    }, 300);
  };

  const handleAddParticipants = () => {
    if (selectedGroupUsers?.length == 0) return;
    const payload = {
      participants: selectedGroupUsers?.map((item) => ({
        user_id: item?.chatUserId,
      })),
      room_id: selectedRoom?.id,
    };

    dispatch(
      addMoreParticipantRequest({
        payloadData: payload,
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: (status) => {
          if (status) {
            navigate.goBack();
          }
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={'Select Participants'}
        hasBorder={false}
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => {
          navigate.goBack();
          dispatch(emptySelectedUsers());
        }}
      />

      <ScrollView
        style={[AppStyles.flex, {marginBottom: 110}]}
        showsVerticalScrollIndicator={false}>
        <TextInput
          leftIcon={Images.Search}
          placeholder={'Search Friend'}
          value={query}
          autoFocus={false}
          onChangeText={handleChangeQuery}
          maxLength={255}
          placeholderTextColor={Colors.placeHolderColor}
          leftIconStyle={{height: 20, width: 20}}
          leftIconWrapperStyle={{top: 22}}
        />

        <View
          style={[
            AppStyles.flexRow,
            AppStyles.alignItemsCenter,
            AppStyles.spaceBetween,
            AppStyles.mTop10,
            {justifyContent: 'flex-end'},
          ]}>
          <Text size={Fonts.size.xSmall} type="medium">
            Selected {selectedGroupUsers?.length}/{allUsers?.length}
          </Text>
        </View>

        {isLoading && (
          <ActivityIndicator size={'large'} style={[AppStyles.mTop15]} />
        )}

        {!isLoading && (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginTop: 25, flex: 1}}
            data={allUsers}
            ListEmptyComponent={EmptyList}
            onEndReached={getMoreParticipants}
            onEndReachedThreshold={0.5}
            renderItem={({item}) => {
              return (
                <Participant
                  {...item}
                  onPress={() => handleOnPressUser(item)}
                  isSelected={
                    selectedGroupUsers?.findIndex(
                      (user) => user?.id == item?.id,
                    ) > -1
                  }
                />
              );
            }}
          />
        )}
      </ScrollView>

      <DisplayBottom>
        <Button
          title={'Add People'}
          disabled={selectedGroupUsers?.length === 0}
          onPress={handleAddParticipants}
        />
      </DisplayBottom>
    </View>
  );
};

export default AddParticipants;
