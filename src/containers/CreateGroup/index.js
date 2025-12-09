import {FlatList, Image, Platform, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import ActionSheet from 'react-native-actionsheet';
import styles from './styles';
import {
  Button,
  ButtonView,
  CustomNavbar,
  EmptyList,
  KeyboardAwareScrollViewComponent,
  Text,
  TextInput,
  Participant,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {StackActions, useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {DisplayBottom} from '../../Partials';
import useImagePicker from '../../hooks/useImagePicker';
import {SCREENS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  createGroupRequest,
  removeUserFromSelectedList,
} from '../../redux/slicers/chat';
import util from '../../util';
import {uploadMediaRequest} from '../../redux/slicers/user';

const CreateGroup = ({route}) => {
  const {params} = route;
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState(params?.title);
  const [groupNameError, setGroupNameError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {selectedGroupUsers} = useSelector((state) => state?.chat);
  const {userData} = useSelector((state) => state?.user);

  const {
    file,
    fileError,
    actionSheetRef,
    onActionPress,
    setFileError,
    openActionSheet,
  } = useImagePicker();

  const onPressAction = (item) => {
    dispatch(removeUserFromSelectedList(item));
  };

  const _validate = () => {
    let isValid = true;

    if (!groupName) {
      setGroupNameError('Field is required.');
      isValid = false;
    } else if (groupName?.trim()?.length === 0) {
      setGroupNameError('Cannot accept whitespaces only.');
      isValid = false;
    }

    if (!params?.imageUrl && !file?.path) {
      setFileError('Image is required.');
      isValid = false;
    }

    return isValid;
  };

  const handleCreateGroup = () => {
    if (_validate()) {
      if (file?.path) {
        setIsLoading(true);
        const payload = new FormData();

        payload.append('files', {
          type: file?.mime,
          name: `filename.${file?.mime}`,
          uri:
            Platform.OS === 'ios'
              ? file?.path.replace('file://', '')
              : file?.path,
        });

        dispatch(
          uploadMediaRequest({
            payloadData: payload,
            responseCallback: (status, response) => {
              if (status) {
                handleCreateGroupReq(response?.[0]?.url);
              } else {
                setIsLoading(false);
              }
            },
          }),
        );
      } else {
        handleCreateGroupReq(params?.imageUrl);
      }
    }
  };

  const handleCreateGroupReq = (url = '') => {
    const participants = selectedGroupUsers?.map((item) => ({
      user_id: item?.chatUserId,
    }));

    const payload = {
      participants: [...participants, {user_id: userData?.chatUserId}],
      isUrl: true,
      room_image: url,
      room_type: 'group',
      room_name: groupName,
    };

    if (params?.challengeId) {
      payload.challenge_id = params?.challengeId;
    }

    setIsLoading(true);

    // if (!file?.path && params?.imageUrl) {
    //   payload.isUrl = true;
    //   payload.room_image = params?.imageUrl;
    // }

    dispatch(
      createGroupRequest({
        payloadData: payload,
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: (status) => {
          if (status) {
            setIsLoading(false);
            setTimeout(() => {
              navigate.dispatch(StackActions.replace(SCREENS.HOME.chat));
            }, 100);
          } else {
            setIsLoading(false);
          }
        },
      }),
    );
  };

  const renderProfile = () => {
    return (
      <>
        <ButtonView style={[styles.profileView]} onPress={openActionSheet}>
          <Image
            source={
              file?.path
                ? {uri: file?.path}
                : params?.imageUrl
                ? {uri: params?.imageUrl}
                : Images.GroupPick
            }
            style={[styles.profileImage]}
          />
        </ButtonView>
        {fileError && (
          <Text
            textAlign="center"
            type="medium"
            size="xxxSmall"
            color={Colors.red}
            style={[AppStyles.mTop5, AppStyles.mBottom5]}>
            {fileError}
          </Text>
        )}
      </>
    );
  };

  const options = ['Take Photo', 'Choose from Library', 'Cancel'];

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={'Create Group'}
        hasBorder={false}
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
      />

      <ScrollView>
        {renderProfile()}

        <TextInput
          leftIcon={Images.GroupName}
          placeholder={'Group Name'}
          value={groupName}
          autoFocus={false}
          onChangeText={(text) => setGroupName(text)}
          maxLength={255}
          placeholderTextColor={Colors.placeHolderColor}
          leftIconStyle={{height: 20, width: 20}}
          leftIconWrapperStyle={{top: 22}}
          error={groupNameError}
        />

        <View
          style={[
            AppStyles.flexRow,
            AppStyles.alignItemsCenter,
            AppStyles.spaceBetween,
            AppStyles.mTop10,
          ]}>
          <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
            <Text
              size={Fonts.size.xSmall}
              type="medium"
              style={[AppStyles.mLeft5]}>
              Participant: {selectedGroupUsers?.length}
            </Text>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginTop: 25, flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          data={selectedGroupUsers}
          ListEmptyComponent={EmptyList}
          renderItem={({item}) => {
            return (
              <Participant
                {...item}
                showCross
                isClickable={false}
                onPressAction={() => onPressAction(item)}
              />
            );
          }}
        />

        <ActionSheet
          ref={actionSheetRef}
          options={options}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          key={1}
          onPress={onActionPress}
        />
      </ScrollView>

      <DisplayBottom>
        <Button
          title={'Create group'}
          disabled={isLoading}
          onPress={handleCreateGroup}
          isLoading={isLoading}
        />
      </DisplayBottom>
    </View>
  );
};

export default CreateGroup;
