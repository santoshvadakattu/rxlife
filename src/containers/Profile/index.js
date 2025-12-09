import {ScrollView, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {
  ButtonView,
  ChallengeStreak,
  CustomNavbar,
  ProfileComponent,
  StateItem,
  Text,
} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {retry} from 'redux-saga/effects';
import {SCREENS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {
  getDailyPointsRequest,
  getStatisticsRequest,
} from '../../redux/slicers/user';

export default function Profile() {
  const {userData, userProfile, dailyPoints} = useSelector(
    (state) => state.user,
  );
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [statisticsData, setStatisticsData] = useState({});
  const {
    gender,
    birthday,
    currentWeight,
    idealWeight,
    height,
    heightInch,
    neck,
    waist,
    hip,
    abdomen,
    arm,
    chest,
    calf,
    bodyFat,
    age,
    bmi,
    image,
    thigh,
  } = userProfile || {};

  useEffect(() => {
    if (!isFocused) return;
    dispatch(
      getStatisticsRequest({
        payloadData: {
          query: '',
        },
        responseCallback: (status, res) => {
          if (status) {
            setStatisticsData(res);
          }
        },
      }),
    );

    dispatch(
      getDailyPointsRequest({
        responseCallback: () => {
          // setPointsLoading(false);
        },
      }),
    );
  }, [isFocused]);

  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
        title={'Profile'}
      />
    );
  }, []);

  const renderProfilePicComponent = () => {
    return (
      <ProfileComponent
        isFriendProfile={false}
        isUserProfile={true}
        singleBtnTxt={'Edit Profile'}
        userData={userData}
        userProfile={userProfile}
        onPressSingleBtn={() => navigate.navigate(SCREENS.HOME.editProfile)}
      />
    );
  };
  const renderStreakChallenge = () => {
    return (
      <View style={{marginTop: 15}}>
        <ChallengeStreak
          streak={statisticsData?.dailyChallengesStreak ?? 0}
          points={dailyPoints?.earned}
        />
      </View>
    );
  };

  const renderBasicInformation = () => {
    const birthdayDate = birthday ? moment(birthday).format('DD-MMM-YYYY') : '';

    if (birthdayDate && gender) {
      return (
        <View
          style={{
            height: 136,
            borderRadius: 12,
            backgroundColor: Colors.white,
            padding: 20,
            marginTop: 15,
          }}>
          <Text
            size={Fonts.size.normal}
            type={Fonts.type.base}
            color={Colors.black2}
            style={{fontWeight: '700'}}>
            Basic Information
          </Text>

          <View style={{marginTop: 10}}>
            {gender && (
              <StateItem
                icon={Images.GenderIcon}
                title={'Gender'}
                des={gender ?? ''}
                hasBottomSeparater={true}
                imageStyle={{width: 19, height: 19}}
              />
            )}

            {birthdayDate && (
              <StateItem
                icon={Images.BirthdayIcon}
                title={'Birthday'}
                des={birthdayDate}
                hasBottomSeparater={false}
                imageStyle={{width: 18, height: 19}}
              />
            )}
          </View>
        </View>
      );
    }

    return <></>;
  };
  const renderStats = () => {
    if (
      currentWeight ||
      idealWeight ||
      height ||
      heightInch ||
      neck ||
      waist ||
      hip ||
      abdomen ||
      arm ||
      chest ||
      calf ||
      bodyFat ||
      age ||
      thigh ||
      bmi
    ) {
      return (
        <View
          style={{
            // height: 500,
            borderRadius: 12,
            backgroundColor: Colors.white,
            padding: 20,
            marginTop: 15,
          }}>
          <Text
            size={Fonts.size.normal}
            type={Fonts.type.base}
            color={Colors.black2}
            style={{fontWeight: '700'}}>
            Basic Information
          </Text>
          <View style={{marginTop: 10}}>
            {age && (
              <StateItem
                icon={Images.BirthdayIcon}
                title={'Age'}
                des={age}
                hasBottomSeparater={true}
                imageStyle={{width: 18, height: 19}}
                unit={'yrs'}
              />
            )}
            {currentWeight && (
              <StateItem
                icon={Images.CurrentWeight}
                title={'Current Weight'}
                des={currentWeight ?? ''}
                hasBottomSeparater={true}
                imageStyle={{width: 19, height: 19}}
                unit={'lb'}
              />
            )}
            {idealWeight && (
              <StateItem
                icon={Images.IdealWeight}
                title={'Ideal Weight'}
                des={idealWeight ?? ''}
                hasBottomSeparater={true}
                unit={'lb'}
                imageStyle={{width: 18, height: 20}}
              />
            )}
            {(height || heightInch) && (
              <StateItem
                icon={Images.Height}
                title={'Height'}
                des={
                  height > 0
                    ? heightInch > 0
                      ? `${height} Fts ${heightInch} Ins`
                      : height + ' Fts'
                    : heightInch > 0
                    ? heightInch + ' Ins'
                    : 'Fts Ins'
                }
                hasBottomSeparater={true}
                imageStyle={{width: 15, height: 15}}
                unit={''}
              />
            )}
            {/* <StateItem
            icon={Images.Height}
            title={'Height Inch'}
            des={heightInch ?? ''}
            hasBottomSeparater={true}
            imageStyle={{width: 15, height: 15}}
            unit={'Inch'}
          /> */}
            {neck && (
              <StateItem
                icon={Images.Neck}
                title={'Neck'}
                des={neck ?? ''}
                hasBottomSeparater={true}
                unit={'Ins'}
                imageStyle={{width: 16, height: 16}}
              />
            )}
            {waist && (
              <StateItem
                icon={Images.Waist}
                title={'Waist'}
                des={waist ?? ''}
                hasBottomSeparater={true}
                imageStyle={{width: 17, height: 16}}
                unit={'Ins'}
              />
            )}
            {hip && (
              <StateItem
                icon={Images.Hip}
                title={'Hip'}
                des={hip ?? ''}
                hasBottomSeparater={true}
                imageStyle={{width: 18, height: 14}}
                unit={'Ins'}
              />
            )}
            {arm && (
              <StateItem
                icon={Images.Arm}
                title={'Arm'}
                des={arm ?? ''}
                hasBottomSeparater={true}
                imageStyle={{width: 18, height: 14}}
                unit={'Ins'}
              />
            )}
            {chest && (
              <StateItem
                icon={Images.ChestCalf}
                title={'Chest'}
                des={chest ?? ''}
                hasBottomSeparater={true}
                imageStyle={{width: 16, height: 16}}
                unit={'Ins'}
              />
            )}
            {calf && (
              <StateItem
                icon={Images.calf}
                title={'Calf'}
                des={calf ?? ''}
                hasBottomSeparater={true}
                imageStyle={{width: 16, height: 16}}
                unit={'Ins'}
              />
            )}
            {thigh && (
              <StateItem
                icon={Images.Thigh}
                title={'Thigh'}
                des={thigh ?? ''}
                hasBottomSeparater={true}
                imageStyle={{width: 16, height: 16}}
                unit={'Ins'}
              />
            )}
            {abdomen && (
              <StateItem
                icon={Images.Abdomen}
                title={'Abdomen'}
                des={abdomen ?? ''}
                hasBottomSeparater={true}
                imageStyle={{width: 16, height: 16}}
                unit={'Ins'}
              />
            )}
            {bodyFat && (
              <StateItem
                icon={Images.Fat}
                title={'Body Fat'}
                des={bodyFat ?? ''}
                hasBottomSeparater={true}
                imageStyle={{width: 23, height: 23}}
                unit={'%'}
              />
            )}
            {bmi && (
              <StateItem
                icon={Images.BMI}
                title={'BMI'}
                des={bmi}
                hasBottomSeparater={false}
                imageStyle={{width: 23, height: 23}}
                unit={'Kg/m^2'}
              />
            )}
          </View>
        </View>
      );
    } else {
      return <></>;
    }
  };

  const renderEditGoals = () => {
    return (
      <ButtonView
        onPress={() => navigate.navigate(SCREENS.HOME.setupUserGoals)}
        style={styles.editGoalsBtn}>
        <Text
          color={Colors.background.primary}
          type={Fonts.type.base}
          size={Fonts.size.xxxSmall}>
          EDIT GOALS
        </Text>
      </ButtonView>
    );
  };
  return (
    <View style={styles.container}>
      {renderCustomNav}
      <ScrollView
        style={{marginBottom: 40}}
        showsVerticalScrollIndicator={false}>
        {renderProfilePicComponent()}
        {renderEditGoals()}
        {renderStreakChallenge()}
        {renderBasicInformation()}
        {renderStats()}
      </ScrollView>
    </View>
  );
}
