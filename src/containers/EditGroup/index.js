import {FlatList, Image, ScrollView, View} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {DisplayBottom} from '../../Partials';
import useImagePicker from '../../hooks/useImagePicker';
import {SCREENS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {uploadMediaRequest} from '../../redux/slicers/user';
import {createGroupRequest, updateGroupRequest} from '../../redux/slicers/chat';

const EditGroup = ({route}) => {
  const {params} = route;
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const {selectedRoom} = useSelector((state) => state?.chat);
  const {userData} = useSelector((state) => state?.user);

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [groupName, setGroupName] = useState(selectedRoom?.roomName);
  const [groupNameError, setGroupNameError] = useState('');

  const {
    file,
    fileError,
    actionSheetRef,
    onActionPress,
    setFileError,
    openActionSheet,
  } = useImagePicker();

  const _validate = () => {
    let isValid = true;

    if (groupName?.length == 0) {
      setGroupNameError('Field is required.');
      isValid = false;
    } else if (groupName?.trim()?.length === 0) {
      setGroupNameError('Cannot accept whitespaces only.');
      isValid = false;
    }

    if (!selectedRoom?.roomImage && !file?.path) {
      setFileError('Image is required.');
      isValid = false;
    }

    return isValid;
  };

  const handleUpdateGroup = () => {
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
                handleUpdateGroupReq(response?.[0]?.url);
              } else {
                setIsLoading(false);
              }
            },
          }),
        );
      } else {
        handleUpdateGroupReq(selectedRoom?.roomImage);
      }
    }
  };

  const handleUpdateGroupReq = (url = '') => {
    const payload = {
      room_image: url,
      room_name: groupName,
      room_id: selectedRoom?.id,
    };

    if (selectedRoom?.challengeId) {
      payload.challenge_id = params?.challengeId;
    }
    setIsLoading(true);

    dispatch(
      updateGroupRequest({
        payloadData: payload,
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: (status) => {
          if (status) {
            setIsLoading(false);
            navigate.goBack();
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
        <View style={[styles.profileView]}>
          <Image
            source={
              file?.path
                ? {uri: file?.path}
                : selectedRoom?.roomImage
                ? {uri: selectedRoom?.roomImage}
                : Images.GroupPick
            }
            style={[styles.profileImage]}
          />

          <ButtonView onPress={openActionSheet} style={styles.editIconView}>
            <Image
              source={Images.GroupPickIcon}
              style={{width: 15, height: 14}}
            />
          </ButtonView>
        </View>
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
        title={'Edit Group'}
        hasBorder={false}
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
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
          title={'Save Edit'}
          onPress={handleUpdateGroup}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </DisplayBottom>
    </View>
  );
};

export default EditGroup;
