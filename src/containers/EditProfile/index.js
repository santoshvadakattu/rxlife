import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Alert, Image, Keyboard, Linking, ScrollView, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Button,
  ButtonView,
  CustomNavbar,
  DatePicker,
  DropDown,
  KeyboardAwareScrollViewComponent,
  Text,
  TextInput,
} from '../../components';
import {AppStyles, Colors, Images} from '../../theme';
import styles from './styles';
import util from '../../util';
import ActionSheet from 'react-native-actionsheet';
import {strings} from '../../constants';
import moment from 'moment';
import {
  updateProfileSetUpRequest,
  uploadMediaRequest,
} from '../../redux/slicers/user';
import {useDispatch, useSelector} from 'react-redux';

const GENDER_OPTIONS = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
];
export default function EditProfile() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {userData, userProfile} = useSelector((state) => state.user);
  // Input states
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState(
    userData.fullname ? userData.fullname : '',
  );
  const [gender, setGender] = useState(
    userProfile.gender
      ? {label: userProfile.gender, value: userProfile.gender}
      : '',
  );

  const [birthDay, setBirthDay] = useState(
    userProfile?.birthday ? new Date(userProfile.birthday) : null,
  );
  const [currentWeight, setCurrentWeight] = useState(
    userProfile?.currentWeight ? userProfile.currentWeight : '',
  );
  const [idealWeight, setIdealWeight] = useState(
    userProfile?.idealWeight ? userProfile.idealWeight : '',
  );
  const [height, setHeight] = useState(
    userProfile?.height ? userProfile.height : '',
  );
  const [heightInch, setHeightInch] = useState(
    userProfile?.heightInch ? userProfile.heightInch : '',
  );
  const [neck, setNeck] = useState(userProfile?.neck ? userProfile.neck : '');
  const [waist, setWaist] = useState(
    userProfile?.waist ? userProfile.waist : '',
  );
  const [hip, setHip] = useState(userProfile?.hip ? userProfile.hip : '');
  const [abdomen, setAbdomen] = useState(
    userProfile?.abdomen ? userProfile.abdomen : '',
  );
  const [arm, setArm] = useState(userProfile?.arm ? userProfile.arm : '');
  const [chest, setChest] = useState(
    userProfile?.chest ? userProfile.chest : '',
  );

  const [calf, setCalf] = useState(userProfile?.calf ? userProfile.calf : '');
  const [thigh, setThigh] = useState(
    userProfile?.thigh ? userProfile.thigh : '',
  );

  const [bodyFat, setBodyFat] = useState(
    userProfile?.bodyFat ? userProfile.bodyFat : '',
  );
  const [bmiValue, setBMIValue] = useState('');
  const [calfValue, setCalfValue] = useState('');

  // Error states
  const [fullNameError, setFullNameError] = useState('');
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

  const fullnameRef = useRef();
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
  const calfRef = useRef();
  const bodyFatRef = useRef();
  const thighRef = useRef();
  const actionSheetRef = useRef();

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
          console.log('e.code', e.code);
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

  const handleFullNameChange = (text) => {
    setFullName(text);
    setFullNameError('');
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

  const handleChangeThigh = (text) => {
    const textLimiter = util.characterLimit(text, 3, 2);
    if (textLimiter) {
      setThigh(text);
    }
    setThighError('');
  };

  const handleSubmit = () => {
    // if (validation()) {
    setIsLoading(true);

    if (file) {
      const path = file.path;
      const data = new FormData();
      data.append('files', {
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
              const payload = {
                data: {
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
                    gender: gender.value,
                    age: birthDay ? util.getAge(birthDay).toString() : '',
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
                    chest,
                    calf,
                    thigh,
                    body_fat: bodyFat,
                    bmi: bmiValue,
                    fullname: fullName,
                  },
                },
                userProfileId: userProfile?.id,
              };
              dispatch(
                updateProfileSetUpRequest({
                  payloadData: payload,
                  responseCallback: (status, response) => {
                    setIsLoading(false);
                    if (status) {
                      navigate.goBack();
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
          data: {
            user: {
              disconnect: [],
              connect: [
                {
                  id: userData?.id,
                },
              ],
            },
            image: userProfile?.imageId,
            gender: gender.value,
            age: birthDay ? util.getAge(birthDay).toString() : '',
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
            fullname: fullName,
          },
        },
        userProfileId: userProfile?.id,
      };
      dispatch(
        updateProfileSetUpRequest({
          payloadData: payload,
          responseCallback: (status, response) => {
            setIsLoading(false);
            if (status) {
              navigate.goBack();
            }
          },
        }),
      );
    }
    // navigate.goBack();
    // }
  };

  const options = ['Take Photo', 'Choose from Library', 'Cancel'];
  const isImageHas = file?.path ? true : userProfile.image ? true : false;

  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
        title={'Edit Profile'}
      />
    );
  }, []);

  const renderProfile = () => {
    return (
      <>
        <View style={[styles.profileView]}>
          <Image
            source={
              file?.path
                ? {uri: file?.path}
                : userProfile.image
                ? {uri: userProfile.image}
                : Images.ProfileIcon
            }
            style={[
              styles.profileImage,
              !isImageHas && {
                height: 45,
                width: 37,
                borderRadius: 0,
                tintColor: Colors.background.primary,
              },
            ]}
          />
          <ButtonView onPress={openActionSheet} style={styles.editIconView}>
            <Image
              source={Images.EditProfile}
              style={{width: 14, height: 15}}
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

  const renderBMI = useMemo(() => {
    return (
      <TextInput
        leftIcon={Images.BMI}
        placeholder={'BMI'}
        value={bmiValue}
        maxLength={80}
        autoCapitalize="none"
        returnKeyType="next"
        placeholderTextColor={Colors.placeHolderColor}
        leftIconStyle={{height: 20, width: 20, tintColor: Colors.black}}
        keyboardType="numeric"
        rightText={'Kg/m^2'}
        editable={false}
      />
    );
  }, [bmiValue]);

  const renderInputs = () => {
    return (
      <View>
        <KeyboardAwareScrollViewComponent
          scrollEnabled={true}
          containerStyle={styles.contentWrapper}>
          <TextInput
            leftIcon={Images.UserIcon}
            ref={fullnameRef}
            placeholder={'Full name'}
            value={fullName}
            onChangeText={handleFullNameChange}
            maxLength={80}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={fullNameError}
          />
          <DropDown
            data={GENDER_OPTIONS}
            value={gender}
            setValue={setGender}
            placeholder={'Select Gender'}
            leftIcon={Images.GenderIcon}
            rightIcon={Images.DropdownIcon}
            error={genderError}
            setError={setGenderError}
          />

          <DatePicker
            leftIcon={Images.BirthdayIcon}
            value={birthDay}
            setValue={setBirthDay}
            setError={setBirthDayError}
            error={birthDayError}
          />

          <TextInput
            leftIcon={Images.CurrentWeight}
            placeholder={'Current Weight'}
            value={currentWeight}
            onChangeText={handleChangeCurrentWeight}
            maxLength={80}
            autoCapitalize="none"
            onSubmitEditing={() => idealWeightRef?.current?.focus?.()}
            ref={currentWeightRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={currentWeightError}
            leftIconStyle={{height: 18, width: 18}}
            keyboardType="numeric"
            rightText={'lb'}
          />

          <TextInput
            leftIcon={Images.IdealWeight}
            placeholder={'Ideal Weight '}
            value={idealWeight}
            onChangeText={handleChangeIdealWeight}
            maxLength={80}
            autoCapitalize="none"
            onSubmitEditing={() => heightRef?.current?.focus?.()}
            ref={idealWeightRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={idealWeightError}
            leftIconStyle={{height: 19, width: 18}}
            keyboardType="numeric"
            rightText={'lb'}
          />
          <View style={{flexDirection: 'row'}}>
            <TextInput
              leftIcon={Images.Height}
              placeholder={'Height '}
              value={height}
              onChangeText={handleChangeHeight}
              maxLength={80}
              autoCapitalize="none"
              onSubmitEditing={() => heightInchRef?.current?.focus?.()}
              ref={heightRef}
              returnKeyType="next"
              placeholderTextColor={Colors.placeHolderColor}
              error={heightError}
              leftIconStyle={{height: 18, width: 18}}
              keyboardType="numeric"
              rightText={'Fts'}
            />
            <View style={{width: 10}} />
            <TextInput
              leftIcon={Images.Height}
              placeholder={'Height '}
              value={heightInch}
              onChangeText={handleChangeHeightInch}
              maxLength={80}
              autoCapitalize="none"
              onSubmitEditing={() => neckRef?.current?.focus?.()}
              ref={heightInchRef}
              returnKeyType="next"
              placeholderTextColor={Colors.placeHolderColor}
              error={heightError}
              leftIconStyle={{height: 18, width: 18}}
              keyboardType="numeric"
              rightText={'inch'}
            />
          </View>
          <TextInput
            leftIcon={Images.Neck}
            placeholder={'Neck'}
            value={neck}
            onChangeText={handleChangeNeck}
            maxLength={80}
            autoCapitalize="none"
            onSubmitEditing={() => waistRef?.current?.focus?.()}
            ref={neckRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={neckError}
            leftIconStyle={{height: 20, width: 20}}
            keyboardType="numeric"
            rightText={'Inch'}
          />

          <TextInput
            leftIcon={Images.Waist}
            placeholder={'Waist'}
            value={waist}
            onChangeText={handleChangeWaist}
            maxLength={80}
            autoCapitalize="none"
            onSubmitEditing={() => hipRef?.current?.focus?.()}
            ref={waistRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={waistError}
            leftIconStyle={{height: 18, width: 19}}
            keyboardType="numeric"
            rightText={'Inch'}
          />

          <TextInput
            leftIcon={Images.Hip}
            placeholder={'Hip'}
            value={hip}
            onChangeText={handleChangeHip}
            maxLength={80}
            autoCapitalize="none"
            onSubmitEditing={() => abdomenRef?.current?.focus?.()}
            ref={hipRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={hipError}
            leftIconStyle={{height: 22, width: 19}}
            keyboardType="numeric"
            rightText={'Inch'}
          />

          <TextInput
            leftIcon={Images.Abdomen}
            placeholder={'Abdomen'}
            value={abdomen}
            onChangeText={handleChangeAbdomen}
            maxLength={80}
            autoCapitalize="none"
            onSubmitEditing={() => armRef?.current?.focus?.()}
            ref={abdomenRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={abdomenError}
            leftIconStyle={{height: 18, width: 18}}
            keyboardType="numeric"
            rightText={'Inch'}
          />

          <TextInput
            leftIcon={Images.Arm}
            placeholder={'Arm'}
            value={arm}
            onChangeText={handleChangeArm}
            maxLength={80}
            autoCapitalize="none"
            onSubmitEditing={() => chestCalfRef?.current?.focus?.()}
            ref={armRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={armError}
            leftIconStyle={{height: 19, width: 19}}
            keyboardType="numeric"
            rightText={'Inch'}
          />

          <TextInput
            leftIcon={Images.ChestCalf}
            placeholder={'Chest'}
            value={chest}
            onChangeText={handleChangeChest}
            maxLength={80}
            autoCapitalize="none"
            onSubmitEditing={() => calfRef?.current?.focus?.()}
            ref={chestCalfRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={chestError}
            leftIconStyle={{height: 18, width: 18}}
            keyboardType="numeric"
            rightText={'Inch'}
          />
          <TextInput
            leftIcon={Images.calf}
            placeholder={'Calf'}
            value={calf}
            onChangeText={handleChangeCalf}
            maxLength={80}
            autoCapitalize="none"
            onSubmitEditing={() => thighRef?.current?.focus?.()}
            ref={calfRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={calfError}
            leftIconStyle={{height: 18, width: 18}}
            keyboardType="numeric"
            rightText={'Inch'}
          />

          <TextInput
            leftIcon={Images.Thigh}
            placeholder={'Thigh'}
            value={thigh}
            onChangeText={handleChangeThigh}
            maxLength={80}
            autoCapitalize="none"
            onSubmitEditing={() => bodyFatRef?.current?.focus?.()}
            ref={thighRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={thighError}
            leftIconStyle={{height: 18, width: 18}}
            keyboardType="numeric"
            rightText={'Inch'}
          />

          <TextInput
            leftIcon={Images.Fat}
            placeholder={'Body Fat'}
            value={bodyFat}
            maxLength={80}
            autoCapitalize="none"
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={bodyFatError}
            leftIconStyle={{height: 20, width: 20, tintColor: Colors.black}}
            keyboardType="numeric"
            rightText={'%'}
            editable={false}
          />
          {renderBMI}
          <Button
            indicatorColor={'white'}
            isLoading={isLoading}
            title="Save"
            onPress={handleSubmit}
          />
        </KeyboardAwareScrollViewComponent>

        <ActionSheet
          ref={actionSheetRef}
          options={options}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          key={1}
          onPress={onActionPress}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCustomNav}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderProfile()}
        {renderInputs()}
      </ScrollView>
    </View>
  );
}
