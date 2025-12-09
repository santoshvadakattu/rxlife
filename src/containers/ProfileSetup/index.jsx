import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert, Keyboard, Linking, Platform} from 'react-native';
import util from '../../util';
import {strings} from '../../constants';
import ProfileSetupUI from './ProfileSetupUI';
import ImagePicker from 'react-native-image-crop-picker';
// import OpenSettings from 'react-native-open-settings';
import moment from 'moment';
import {
  loginUserRequest,
  profileSetUpRequest,
  uploadMediaRequest,
} from '../../redux/slicers/user';
import {useDispatch, useSelector} from 'react-redux';

const ProfileSetup = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.user);

  // Input states
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState('');
  const [birthDay, setBirthDay] = useState(null);
  const [currentWeight, setCurrentWeight] = useState('');
  const [idealWeight, setIdealWeight] = useState('');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [abdomen, setAbdomen] = useState('');
  const [arm, setArm] = useState('');
  const [chest, setChest] = useState('');
  const [calf, setCalf] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [bmiValue, setBMIValue] = useState('');
  const [calfValue, setCalfValue] = useState('');
  const [heightInch, setHeightInch] = useState('');
  const [thigh, setThigh] = useState('');
  // Error states
  const [fileError, setFileError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [birthDayError, setBirthDayError] = useState('');
  const [currentWeightError, setCurrentWeightError] = useState('');
  const [idealWeightError, setIdealWeightError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [neckError, setNeckError] = useState('');
  const [waistError, setWaistError] = useState('');
  const [hipError, setHipError] = useState('');
  const [abdomenError, setAbdomenError] = useState('');
  const [armError, setArmError] = useState('');
  const [chestError, setChestError] = useState('');
  const [calfError, setCalfError] = useState('');
  const [bodyFatError, setBodyFatError] = useState('');
  const [thighError, setThighError] = useState('');

  // REFS
  const genderRef = useRef();
  const birthDayRef = useRef();
  const currentWeightRef = useRef();
  const idealWeightRef = useRef();
  const heightRef = useRef();
  const heightInchRef = useRef();
  const neckRef = useRef();
  const waistRef = useRef();
  const hipRef = useRef();
  const abdomenRef = useRef();
  const armRef = useRef();
  const chestCalfRef = useRef();
  const bodyFatRef = useRef();
  const actionSheetRef = useRef();
  const calfRef = useRef();
  const thighRef = useRef();

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
        console.log('err0r => ', e, e.code);
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
                  // OpenSettings.openSettings();
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
        console.log('err0r => ', e, e.code);
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
        } else if (e.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
          Alert.alert('Error', 'No camera on simulator');
        }
      });
  };

  const handleChangeCurrentWeight = (text) => {
    const textLimiter = util.characterLimit(text, 3, 2);
    if (textLimiter) {
      setCurrentWeight(text);
    }
    setCurrentWeightError('');
  };

  const handleChangeIdealWeight = (text) => {
    const textLimiter = util.characterLimit(text, 3, 2);
    if (textLimiter) {
      setIdealWeight(text);
    }

    setIdealWeightError('');
  };

  const handleChangeHeight = (text) => {
    const textLimiter = util.characterLimit(text, 3, 0);
    if (textLimiter) {
      setHeight(text);
    }
    setHeightError('');
  };
  const handleChangeHeightInch = (text) => {
    if (text < 12) {
      const textLimiter = util.characterLimit(text, 3, 0);
      if (textLimiter) {
        setHeightInch(text);
      }
    }
  };

  const handleChangeHip = (text) => {
    const textLimiter = util.characterLimit(text, 3, 2);
    if (textLimiter) {
      setHip(text);
    }
    setHipError('');
  };

  const handleChangeNeck = (text) => {
    const textLimiter = util.characterLimit(text, 3, 2);
    if (textLimiter) {
      setNeck(text);
    }
    setNeckError('');
  };

  const handleChangeWaist = (text) => {
    const textLimiter = util.characterLimit(text, 3, 2);
    if (textLimiter) {
      setWaist(text);
    }
    setWaistError('');
  };

  const handleChangeAbdomen = (text) => {
    const textLimiter = util.characterLimit(text, 3, 2);
    if (textLimiter) {
      setAbdomen(text);
    }
    setAbdomenError('');
  };

  const handleChangeArm = (text) => {
    const textLimiter = util.characterLimit(text, 3, 2);
    if (textLimiter) {
      setArm(text);
    }
    setArmError('');
  };

  const handleChangeChest = (text) => {
    const textLimiter = util.characterLimit(text, 3, 2);
    if (textLimiter) {
      setChest(text);
    }
    setChestError('');
  };

  const handleChangeCalf = (text) => {
    const textLimiter = util.characterLimit(text, 3, 2);
    if (textLimiter) {
      setCalf(text);
    }
    setCalfError('');
  };

  const handleChangeBodyFat = (text) => {
    const textLimiter = util.characterLimit(text, 3, 2);
    if (textLimiter) {
      setBodyFat(text);
    }
    setBodyFatError('');
  };

  const handleChangeThigh = (text) => {
    const textLimiter = util.characterLimit(text, 3, 2);
    if (textLimiter) {
      setThigh(text);
    }
    setThighError('');
  };

  useEffect(() => {
    if (currentWeight && height && heightInch) {
      const calculateBmi = util.calculateBMI(height, currentWeight, heightInch);
      calculateBmi && calculateBmi > 0 && setBMIValue(calculateBmi.toFixed(2));
    }
  }, [currentWeight, height, heightInch]);

  useEffect(() => {
    if (gender.value == 'Male') {
      if (gender && waist && neck && height && heightInch) {
        const calculateBodyFat = util.calculateNavyBodyFatPercentage(
          gender,
          abdomen,
          waist,
          neck,
          hip,
          height,
          heightInch,
        );

        if (calculateBodyFat) {
          if (calculateBodyFat == '-Infinity') {
            setBodyFatError('Infinite Calculation');
            setBodyFat('');
          } else {
            setBodyFat(calculateBodyFat.toFixed(2));
            setBodyFatError('');
          }
        } else {
          setBodyFatError('Infinite Calculation');
          setBodyFat('');
        }
      }
    } else if (gender.value == 'Female') {
      if (gender && waist && hip && height && neck && heightInch) {
        const calculateBodyFat = util.calculateNavyBodyFatPercentage(
          gender,
          abdomen,
          waist,
          neck,
          hip,
          height,
          heightInch,
        );
        if (calculateBodyFat) {
          if (calculateBodyFat == '-Infinity') {
            setBodyFatError('Infinite Calculation');
            setBodyFat('');
          } else {
            setBodyFat(calculateBodyFat.toFixed(2));
            setBodyFatError('');
          }
        } else {
          setBodyFatError('Infinite Calculation');
          setBodyFat('');
        }
      }
    }
  }, [gender, abdomen, waist, neck, hip, height, heightInch]);

  const handleSubmit = () => {
    // if (validation()) {
    setIsLoading(true);

    if (file) {
      const path = file?.path;
      const data = new FormData();
      // const filenameParts = file?.filename?.split('.');
      // const extension = filenameParts[1];
      data.append('files', {
        // name: file?.filename?.toLowerCase(),
        // type: `image/${extension.toLowerCase()}`,
        type: file?.mime,
        name: `filename.${file?.mime}`,
        uri: Platform.OS === 'ios' ? path.replace('file://', '') : path,
      });
      dispatch(
        uploadMediaRequest({
          payloadData: data,
          responseCallback: (status, uploadedFile) => {
            setIsLoading(false);

            if (status) {
              setIsLoading(true);
              const payload = {
                data: {
                  user: {
                    disconnect: [],
                    connect: [
                      {
                        id: userData?.id,
                      },
                    ],
                  },
                  image: uploadedFile[0]?.id,
                  age: birthDay ? util.getAge(birthDay).toString() : '',
                  gender: gender?.value,
                  birthday: birthDay
                    ? moment(birthDay).format('YYYY-MM-DD')
                    : null,
                  current_weight: currentWeight,
                  ideal_weight: idealWeight,
                  height_in_feet: height,
                  height_in_inches: heightInch,
                  neck,
                  waist,
                  hip,
                  abdomen,
                  arm,
                  thigh,
                  chest: chest,
                  calf: calf,
                  body_fat: bodyFat,
                  bmi: bmiValue,
                  fullname: userData?.fullname ?? '',
                },
              };
              dispatch(
                profileSetUpRequest({
                  payloadData: payload,
                  responseCallback: (status, response) => {
                    setIsLoading(false);
                    if (status) {
                      navigate.navigate('setupGoals');
                    }
                  },
                }),
              );
            }
          },
        }),
      );
    } else {
      const payload = {
        data: {
          user: {
            disconnect: [],
            connect: [
              {
                id: userData?.id,
              },
            ],
          },
          image: null,
          age: birthDay ? util.getAge(birthDay).toString() : '',
          gender: gender?.value,
          birthday: birthDay ? moment(birthDay).format('YYYY-MM-DD') : null,
          current_weight: currentWeight,
          ideal_weight: idealWeight,
          height_in_feet: height,
          height_in_inches: heightInch,
          neck,
          waist,
          hip,
          abdomen,
          arm,
          chest,
          calf,
          thigh,
          body_fat: bodyFat,
          bmi: bmiValue,
          fullname: userData?.fullname ?? '',
        },
      };
      dispatch(
        profileSetUpRequest({
          payloadData: payload,
          responseCallback: (status, response) => {
            setIsLoading(false);
            if (status) {
              navigate.navigate('setupGoals');
            }
          },
        }),
      );
    }

    // }
  };

  function skipBtnOnpress() {
    handleSubmit();
    // dispatch(loginUserRequest())
  }
  const options = ['Take Photo', 'Choose from Library', 'Cancel'];

  return (
    <ProfileSetupUI
      // hooks
      navigate={navigate}
      // states
      isLoading={isLoading}
      currentWeight={currentWeight}
      idealWeight={idealWeight}
      height={height}
      neck={neck}
      waist={waist}
      hip={hip}
      abdomen={abdomen}
      arm={arm}
      chest={chest}
      calf={calf}
      bodyFat={bodyFat}
      thigh={thigh}
      options={options}
      file={file}
      gender={gender}
      bmiValue={bmiValue}
      birthDay={birthDay}
      genderError={genderError}
      birthDayError={birthDayError}
      currentWeightError={currentWeightError}
      idealWeightError={idealWeightError}
      heightError={heightError}
      neckError={neckError}
      waistError={waistError}
      hipError={hipError}
      abdomenError={abdomenError}
      armError={armError}
      chestError={chestError}
      calfError={calfError}
      thighError={thighError}
      bodyFatError={bodyFatError}
      fileError={fileError}
      calfValue={calfValue}
      // REFS
      actionSheetRef={actionSheetRef}
      genderRef={genderRef}
      birthDayRef={birthDayRef}
      currentWeightRef={currentWeightRef}
      idealWeightRef={idealWeightRef}
      heightRef={heightRef}
      heightInchRef={heightInchRef}
      neckRef={neckRef}
      waistRef={waistRef}
      hipRef={hipRef}
      abdomenRef={abdomenRef}
      armRef={armRef}
      chestCalfRef={chestCalfRef}
      bodyFatRef={bodyFatRef}
      calfRef={calfRef}
      thighRef={thighRef}
      // functions
      handleSubmit={handleSubmit}
      openActionSheet={openActionSheet}
      onActionPress={onActionPress}
      setGender={setGender}
      setBirthDay={setBirthDay}
      handleChangeCurrentWeight={handleChangeCurrentWeight}
      handleChangeIdealWeight={handleChangeIdealWeight}
      handleChangeHeight={handleChangeHeight}
      handleChangeHip={handleChangeHip}
      handleChangeNeck={handleChangeNeck}
      handleChangeWaist={handleChangeWaist}
      handleChangeAbdomen={handleChangeAbdomen}
      handleChangeArm={handleChangeArm}
      handleChangeChest={handleChangeChest}
      handleChangeCalf={handleChangeCalf}
      handleChangeBodyFat={handleChangeBodyFat}
      setGenderError={setGenderError}
      setBirthDayError={setBirthDayError}
      skipBtnOnpress={skipBtnOnpress}
      handleChangeHeightInch={handleChangeHeightInch}
      handleChangeThigh={handleChangeThigh}
      heightInch={heightInch}
    />
  );
};

export default ProfileSetup;
