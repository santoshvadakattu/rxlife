import React, {useState} from 'react';
import NotificationSettingsUI from './NotificationSettingsUI';
import {useNavigation} from '@react-navigation/native';
import {NOTIFICATIONS_SETTINGS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserNotificationSettingRequest} from '../../redux/slicers/user';

const NotificationSettings = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [options, setOptions] = useState(NOTIFICATIONS_SETTINGS);
  const {userData} = useSelector((state) => state?.user);

  const handleToggleSwitch = (field, isOn) => {
    dispatch(
      updateUserNotificationSettingRequest({
        payloadData: {
          [field]: isOn,
        },
        params: userData?.id,
        responseCallback: (status) => {},
      }),
    );
  };

  return (
    <NotificationSettingsUI
      navigate={navigate}
      options={options}
      userData={userData}
      handleToggleSwitch={handleToggleSwitch}
    />
  );
};

export default NotificationSettings;
