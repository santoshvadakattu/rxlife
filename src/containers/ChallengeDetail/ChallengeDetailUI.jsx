import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import ViewShot from 'react-native-view-shot';
import {
  Button,
  ButtonView,
  CarouselListArrow,
  ChallengeBox,
  CustomNavbar,
  GoalCheckItem,
  LeaderBoardPerson,
  PointDetail,
  Text,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';

const QUOTE_TEXT = `If you let go a little, you will have a little peace. If you let go a lot, you will have a lot of peace. If you let go completely, you will have complete peace.`;

const ChallengeDetailUI = (props) => {
  const {
    active,
    userData,
    challengeData,
    isLoading,
    refFlatList,
    dateData,
    myChallenge,
    leaderBoardData,
    isVisible,
    selectedDate,
    allowedEditing,
    viewShotRef,
    shouldAllowEditing,
    challengePoint,
    screenLoading,
    shuffledQuote,
    dailyChallengeVideo,
    // functions
    navigate,
    setActive,
    handleJoinChallenge,
    clickOnLeft,
    clickOnRight,
    handleMarkAsCompleted,
    toggleVisible,
    handleToggleCheck,
    itemsChecked,
    handleShare,
    handleShareOnInstagram,
    handleShareOnMessage,
    handleCreateGroup,
    handleOpenExternalLink,
    navigateToVideoScreen,
    setIsChallengeImageLoader,
    isChallengeImageLoader,
  } = props;

  const renderModal = () => {
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={toggleVisible}
        style={[AppStyles.flex]}>
        <View style={[AppStyles.centerInner, styles.modalWrapper]}>
          <ButtonView onPress={toggleVisible} style={styles.crossWrapper}>
            <Image source={Images.CrossDark} style={styles.cross} />
          </ButtonView>

          <ViewShot
            ref={viewShotRef}
            style={AppStyles.centerInner}
            options={{
              fileName: 'challenge-completion',
              format: 'jpg',
              quality: 0.9,
              result: 'tmpfile',
            }}>
            <Text size={Fonts.size.large} type="semiBold">
              Challenge Completion
            </Text>

            <Text size={28} type="semiBold" color={Colors.text.accent}>
              {challengePoint ?? 0} Points Earn
            </Text>
            {isChallengeImageLoader && (
              <ActivityIndicator
                size={'small'}
                color={Colors.background.darkBlue}
              />
            )}
            <ImageBackground
              source={
                shuffledQuote?.image
                  ? {uri: shuffledQuote?.image}
                  : Images.ChallengeComplete
              }
              onLoad={() => {
                setIsChallengeImageLoader(false);
              }}
              style={styles.challengeComplete}
              resizeMode="contain"
              imageStyle={{borderRadius: 12, resizeMode: 'contain'}}>
              <Text
                size={Fonts.size.xxxSmall}
                color={Colors.white}
                style={{marginHorizontal: 15}}
                textAlign="center"
                numberOfLines={12}>
                {shuffledQuote?.quote || QUOTE_TEXT}
              </Text>

              {shuffledQuote?.quote && shuffledQuote?.quotedBy && (
                <Text
                  style={AppStyles.mTop15}
                  size={Fonts.size.xxxSmall}
                  type="semiBold"
                  textAlign="center"
                  numberOfLines={1}
                  color={Colors.white}>
                  {shuffledQuote?.quotedBy}
                </Text>
              )}

              {!shuffledQuote?.quote && (
                <Text
                  style={AppStyles.mTop15}
                  size={Fonts.size.xxxSmall}
                  type="semiBold"
                  textAlign="center"
                  color={Colors.white}>
                  Ajahn Chah
                </Text>
              )}
            </ImageBackground>
          </ViewShot>

          <Button
            style={[styles.btnstyle, {marginTop: 20}]}
            title={'Share on Instagram'}
            onPress={handleShareOnInstagram}
            disabled={isChallengeImageLoader}
          />
          <Button
            style={styles.btnstyle}
            title={'Send Message'}
            disabled={isChallengeImageLoader}
            onPress={handleShareOnMessage}
          />
          <Button
            style={styles.btnstyle}
            title={'Share'}
            onPress={handleShare}
            disabled={isChallengeImageLoader}
          />
        </View>
      </Modal>
    );
  };

  const renderOverview = () => {
    return (
      <View style={AppStyles.flex}>
        <View style={[AppStyles.flex, styles.descContainer]}>
          <Text type="semiBold" size={16}>
            Description
          </Text>
          <ScrollView nestedScrollEnabled={true} style={{maxHeight: 120}}>
            <Text size={Fonts.size.xSmall} style={[AppStyles.pTop5]}>
              {challengeData?.description}
            </Text>

            <Text type="semiBold" size={16} style={AppStyles.pTop10}>
              End Date
            </Text>
            <Text size={Fonts.size.xSmall} style={[AppStyles.pTop5]}>
              {moment(challengeData?.endDate).format('DD-MMMM-YYYY')}
            </Text>
          </ScrollView>
        </View>

        {challengeData?.rules && (
          <View style={[AppStyles.flex, styles.descContainer]}>
            <Text type="semiBold" size={16}>
              Rule
            </Text>
            <ScrollView nestedScrollEnabled={true} style={{maxHeight: 120}}>
              <Text size={Fonts.size.xSmall} style={[AppStyles.pTop5]}>
                {challengeData?.rules}
              </Text>
            </ScrollView>
          </View>
        )}

        {challengeData?.habit && (
          <View style={[AppStyles.flex, styles.descContainer]}>
            <Text type="semiBold" size={16}>
              Habit
            </Text>
            <ScrollView nestedScrollEnabled={true} style={{maxHeight: 120}}>
              <Text size={Fonts.size.xSmall} style={[AppStyles.pTop5]}>
                {challengeData?.habit}
              </Text>
            </ScrollView>
          </View>
        )}

        {challengeData?.prizes && (
          <View style={[AppStyles.flex, styles.descContainer]}>
            <Text type="semiBold" size={16}>
              Prize
            </Text>
            <ScrollView nestedScrollEnabled={true} style={{maxHeight: 120}}>
              <Text size={Fonts.size.xSmall} style={[AppStyles.pTop5]}>
                {challengeData?.prizes}
              </Text>
            </ScrollView>
          </View>
        )}

        {challengeData?.resources?.length > 0 && (
          <View style={[AppStyles.flex, styles.descContainer]}>
            <Text type="semiBold" size={16}>
              Resource
            </Text>

            <FlatList
              data={challengeData?.resources}
              renderItem={({item}) => (
                <ButtonView onPress={() => handleOpenExternalLink(item?.link)}>
                  <Text
                    size={Fonts.size.xSmall}
                    style={[AppStyles.pTop5, {color: Colors.text.theme}]}>
                    {item?.link}
                  </Text>
                </ButtonView>
              )}
            />
          </View>
        )}
      </View>
    );
  };

  const renderTasks = () => {
    return (
      <View style={[AppStyles.flex7, styles.descContainer]}>
        {!challengeData?.isDaily && (
          <CarouselListArrow
            data={dateData}
            refFlatlist={refFlatList}
            clickOnLeft={clickOnLeft}
            clickOnRight={clickOnRight}
            setCurrentIndex={() => {}}
          />
        )}

        <Text size={16} type="semiBold" style={AppStyles.mTop10}>
          Tasks
        </Text>

        {!myChallenge && (
          <FlatList
            data={challengeData?.task}
            renderItem={({item}) => <PointDetail data={item} key={item?.id} />}
          />
        )}

        {myChallenge && (
          <FlatList
            data={itemsChecked}
            initialNumToRender={itemsChecked?.length}
            renderItem={({item}) => (
              <View
                style={[
                  AppStyles.flex,
                  AppStyles.flexRow,
                  // AppStyles.centerInner,
                  {
                    marginTop: 15,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 0,
                  },
                ]}>
                <GoalCheckItem
                  handleToggleCheck={handleToggleCheck}
                  itemId={item?.id}
                  title={item?.title}
                  isChecked={item?.completed ?? false}
                  disabled={shouldAllowEditing ? false : true}
                  selectedDate={selectedDate}
                  containerStyle={{
                    ...AppStyles.mTop5,
                    ...AppStyles.padding0,
                    paddingLeft: 3,
                  }}
                />
                <Text size={Fonts.size.xxxSmall} color={`rgba(55, 55, 55, .5)`}>
                  {item?.points < 10 ? `0${item?.points}` : item?.points} points
                </Text>
              </View>
            )}
          />
        )}
      </View>
    );
  };

  const renderLeaderboard = () => {
    return (
      <View style={[styles.leaderBoard, AppStyles.themeShadow]}>
        <View style={styles.leaderBoardHeader}>
          <Text size={16} type="semiBold">
            Leader Board
          </Text>

          <ButtonView
            onPress={() =>
              navigate.navigate('leaderboardListing', {
                leaderBoardData,
                challengeTitle: challengeData?.title,
              })
            }>
            <Text
              size={Fonts.size.xSmall}
              type="medium"
              color={Colors.text.theme}>
              See All
            </Text>
          </ButtonView>
        </View>
        <View>
          <FlatList
            data={
              leaderBoardData?.length > 3
                ? leaderBoardData?.slice(0, 3)
                : leaderBoardData
            }
            renderItem={({item}) => <LeaderBoardPerson item={item} />}
            style={AppStyles.mTop15}
          />
        </View>
      </View>
    );
  };

  const renderDailyChallengeVideoButton = () => {
    let url = dailyChallengeVideo?.url?.split('.');
    if (dailyChallengeVideo?.thumbnail) {
      url = dailyChallengeVideo?.thumbnail;
    } else {
      url?.pop();
      url = url?.join('.') + '.jpg';
      url = url?.replace('/upload/', '/upload/so_0/');
    }

    return (
      <ButtonView
        style={styles.dailyChallengeContainer}
        onPress={navigateToVideoScreen}>
        <ImageBackground
          source={{uri: url}}
          imageStyle={{height: 37, width: 37, borderRadius: 6}}
          style={styles?.dailyChallengeVideoIconContainer}>
          <Image
            source={Images.Video}
            style={{height: 20, width: 20, backgroundColor: '#000'}}
          />
        </ImageBackground>

        <View style={styles?.dailyChallengeTitleContainer}>
          <Text color={Colors.white} type="base" size={Fonts?.size.xSmall}>
            Play Daily Challenge Video
          </Text>

          <Text color={Colors.white} type="base" size={Fonts?.size.xxxSmall}>
            {dailyChallengeVideo?.title}
          </Text>
        </View>
      </ButtonView>
    );
  };

  return (
    <View style={[styles.container]}>
      <CustomNavbar
        title={challengeData?.title}
        hasBorder={false}
        titleColor={Colors.black}
        hasBack
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
      />

      {screenLoading && (
        <ActivityIndicator size={'large'} style={AppStyles.mTop30} />
      )}

      {!screenLoading && (
        <ScrollView
          nestedScrollEnabled={true}
          style={styles.wrapper}
          showsVerticalScrollIndicator={false}>
          <ChallengeBox
            data={challengeData}
            clickable={false}
            myChallenge={myChallenge}
            showVideo
            todayVideoUrl={challengeData?.introVideo}
          />

          {!(myChallenge && !challengeData?.onGoing) && (
            <View style={styles.viewSelected}>
              <TouchableOpacity
                onPress={() => setActive(true)}
                style={[
                  styles.selectionView,
                  active && {backgroundColor: Colors.background.primary},
                ]}>
                <Text
                  color={Colors.text.primary}
                  type={Fonts.type.base}
                  style={[
                    styles.selectedTxt,
                    {color: active ? Colors.white : Colors.text.primary},
                  ]}>
                  Overview
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActive(false)}
                style={[
                  styles.selectionView,
                  !active && {backgroundColor: Colors.background.primary},
                ]}>
                <Text
                  color={Colors.text.primary}
                  type={Fonts.type.base}
                  style={[
                    styles.selectedTxt,
                    {color: !active ? Colors.white : Colors.text.primary},
                  ]}>
                  Tasks
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Will work for challenge purchase flow */}
          {!myChallenge && active && renderOverview()}

          {myChallenge &&
            !active &&
            dailyChallengeVideo &&
            challengeData?.onGoing &&
            renderDailyChallengeVideoButton()}

          {!myChallenge && !active && renderTasks()}

          {/* will work for my ongoing challenge */}
          {myChallenge && challengeData?.onGoing && active && renderOverview()}
          {myChallenge && challengeData?.onGoing && !active && renderTasks()}

          {myChallenge && !challengeData?.onGoing && renderTasks()}

          {myChallenge &&
            challengeData?.onGoing &&
            !active &&
            renderLeaderboard()}
          {myChallenge && challengeData?.completed && renderLeaderboard()}

          {!myChallenge && !userData?.isAdmin && (
            <Button
              title={'JOIN'}
              isLoading={isLoading}
              onPress={handleJoinChallenge}
            />
          )}

          {myChallenge && challengeData?.onGoing && !active && (
            <Button
              title={'Mark as Complete'}
              isLoading={isLoading}
              background={
                shouldAllowEditing ? Colors.text.theme : Colors.text.primary
              }
              onPress={handleMarkAsCompleted}
              disabled={!shouldAllowEditing}
            />
          )}

          {myChallenge && !challengeData?.onGoing && (
            <Button
              title={'Share'}
              isLoading={isLoading}
              onPress={toggleVisible}
            />
          )}

          {!challengeData?.chatRoomId && userData?.isAdmin && (
            <Button
              title={'Create Chat Group'}
              // isLoading={isLoading}
              onPress={handleCreateGroup}
            />
          )}
        </ScrollView>
      )}

      {renderModal()}
    </View>
  );
};

export default ChallengeDetailUI;
