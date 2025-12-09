import React, {useRef, useState} from 'react';
import {Alert, Linking} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const useImagePicker = () => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const actionSheetRef = useRef();

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const onActionPress = (key) => {
    if (key === 2) return;

    if (key === 1) {
      launchImageLibraryAction();
    }

    if (key === 0) {
      launchCameraAction();
    }
  };

  const launchImageLibraryAction = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then((image) => {
        setFile(image);
        setFileError('');
      })
      .catch((e) => {
        if (
          (e.code && e.code === 'E_PERMISSION_MISSING') ||
          e.code === 'E_PICKER_NO_CAMERA_PERMISSION' ||
          e.code === 'E_NO_CAMERA_PERMISSION' ||
          e?.code === 'E_NO_LIBRARY_PERMISSION'
        ) {
          Alert.alert(
            'Permission Required',
            'Cannot access images. Please allow access if you want to be able to select images.',
            [
              {
                text: 'Open Settings',
                onPress: () => {
                  Linking.openSettings();
                },
              },
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
      });
  };

  const launchCameraAction = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      useFrontCamera: true,
      compressImageQuality: 0.7,
    })
      .then((image) => {
        setFile(image);
        setFileError('');
      })
      .catch((e) => {
        if (
          (e.code && e.code === 'E_PERMISSION_MISSING') ||
          e.code === 'E_PICKER_NO_CAMERA_PERMISSION' ||
          e.code === 'E_NO_CAMERA_PERMISSION' ||
          e?.code === 'E_NO_LIBRARY_PERMISSION'
        ) {
          Alert.alert(
            'Permission Required',
            'Please allow this app to use your camera.',
            [
              {
                text: 'Open Settings',
                onPress: () => {
                  // OpenSettings.openSettings();
                },
              },
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        } else if (e.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
          Alert.alert('Error', 'No camera on simulator');
        }
      });
  };

  return {
    file,
    fileError,
    actionSheetRef,
    onActionPress,
    setFileError,
    openActionSheet,
  };
};

export default useImagePicker;
