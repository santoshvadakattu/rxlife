import {View, ImageBackground, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BlurView} from '@react-native-community/blur';

import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import Text from '../Text';
import ButtonView from '../ButtonView';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';
import moment from 'moment';

const ChallengeBox = (props) => {
  const {
    data,
    myChallenge = false,
    clickable = true,
    showVideo = false,
    todayVideoUrl = '',
  } = props;

  const navigate = useNavigation();
  const [bgImage, setBgImage] = useState(data?.bgImage);

  const dailyVideos = data?.dailyVideos || [];

  // useEffect(() => {
  // if (myChallenge && !clickable && dailyVideos?.length > 0) {
  //   const findTodayVideo = dailyVideos.find(
  //     (item) => item?.date === moment().format('DD-MM-YYYY'),
  //   );

  //   if (findTodayVideo) {
  //     if (findTodayVideo?.thumbnail) {
  //       setBgImage(findTodayVideo?.thumbnail);
  //       return;
  //     }
  //     let url = findTodayVideo?.url?.split('.');
  //     url?.pop();
  //     url = url.join('.') + '.jpg';
  //     url = url.replace('/upload/', '/upload/so_0/');
  //     setBgImage(url);
  //   }
  // } else {
  // }
  // setBgImage(data?.bgImage);
  // }, [data, myChallenge, clickable]);

  const onVideoPlayClick = () => {
    navigate.navigate(SCREENS.HOME.videoScreen, {
      videoUrl: todayVideoUrl || data?.introVideo,
    });
  };

  const hasVideoLink = todayVideoUrl || data?.introVideo;

  const renderContent = () => {
    return (
      <ImageBackground
        source={{uri: bgImage || data?.bgImage}}
        style={styles.box}
        imageStyle={styles.bgImage}>
        <View style={styles.marginView}>
          {showVideo && hasVideoLink && (
            <ButtonView style={styles.videoIconView} onPress={onVideoPlayClick}>
              <Image source={Images.Video} style={styles.videoIcon} />

              <Text style={styles.challengeOverview}>
                Play Challenge Overview Video
              </Text>
            </ButtonView>
          )}

          <View
            style={{
              overflow: 'hidden',
              width: '100%',
              height: 87,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: 6,
            }}>
            <BlurView
              style={{
                position: 'absolute',
                bottom: 0,
                top: 0,
                right: 0,
                left: 0,
              }}
              blurRadius={5}
              blurAmount={10}>
              <View
                style={{
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  width: '90%',
                  height: 80,
                }}>
                <View style={styles.titleWrapper}>
                  <Text
                    size={Fonts.size.xSmall}
                    color={Colors.white}
                    type={'medium'}>
                    {data?.title?.length > 22
                      ? data?.title?.slice(0, 19) + '...'
                      : data?.title}
                  </Text>
                  <Text size={Fonts.size.xxxxxSmall} color={Colors.white}>
                    {data?.isDaily && '1 Day'}
                    {!data?.isDaily && (
                      <>
                        {myChallenge ? (
                          <>
                            {data?.onGoing
                              ? `Remaining Days ${data?.remainingDays}/${data?.totalDays}`
                              : `Completed Tasks ${data?.completedTasks}/${data?.totalDays}`}
                          </>
                        ) : (
                          `Remaining Days ${data?.remainingDays}/${data?.totalDays}`
                        )}
                      </>
                    )}
                  </Text>
                </View>

                <Text
                  size={Fonts.size.xxxxxSmall}
                  color={Colors.white}
                  style={{marginLeft: 15}}>
                  {myChallenge == false && data?.startDateDisplay}

                  {myChallenge && (
                    <>
                      {data?.onGoing
                        ? `${data?.startDateDisplay} Ongoing`
                        : 'Completed'}
                    </>
                  )}
                </Text>

                <View style={styles.challengeInfo}>
                  {data?.participants > 0 && (
                    <View
                      style={[
                        styles.participants,
                        data?.participants === 1 && {width: 23},
                        data?.participants === 2 && {width: 35},
                      ]}>
                      {[
                        ...Array(
                          data?.participants > 2 ? 3 : data?.participants,
                        ),
                      ]?.map((_, index) => (
                        <Image
                          source={
                            data?.participantsPictures?.[index]
                              ? {uri: data?.participantsPictures?.[index]}
                              : Images?.ProfileIcon
                          }
                          style={[
                            styles.image,
                            index == 1 && {left: 13, zIndex: 2},
                            index == 2 && {left: 26, zIndex: 3},
                          ]}
                        />
                      ))}
                    </View>
                  )}

                  <View style={[{marginLeft: 8}]}>
                    <Text size={Fonts.size.xxxxxSmall} color={Colors.white}>
                      {data?.participants ?? 'No'} Participants
                    </Text>
                  </View>

                  <View style={{marginLeft: 'auto'}}>
                    <Text
                      size={Fonts.size.xSmall}
                      color={Colors.white}
                      type="medium">
                      {!myChallenge && (
                        <>{!data?.isPaid ? 'Free' : `$${data?.amount}.00`}</>
                      )}

                      {myChallenge && (
                        <>Points {data?.points > 99 ? `99+` : data?.points}</>
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            </BlurView>
          </View>
        </View>
      </ImageBackground>
    );
  };

  if (!clickable) {
    return <View style={[AppStyles.flex]}>{renderContent()}</View>;
  }

  return (
    <ButtonView
      rippleOnAndroid={true}
      onPress={() => {
        navigate.navigate(
          myChallenge
            ? SCREENS.HOME.myChallengeDetail
            : SCREENS.HOME.challengeDetail,
          {
            challengeId: data?.id,
            myChallenge,
          },
        );
      }}>
      {renderContent()}
    </ButtonView>
  );
};

export default ChallengeBox;
