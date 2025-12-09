import React, {useEffect, useRef, useState} from 'react';
import ChallengeDetailUI from './ChallengeDetailUI';
import Share from 'react-native-share';

import {StackActions, useNavigation} from '@react-navigation/native';
import {LEADERBOARD_INFO, SCREENS} from '../../constants';
import util, {uuid} from '../../util';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {
  createCompleteChallengeRequest,
  getCompleteChallengeRequest,
  getIndiviualLeaderboardRequest,
  getOneChallengeRequest,
  joinChallengeGroupRequest,
  joinChallengeRequest,
  updateCompleteChallengeRequest,
} from '../../redux/slicers/challenge';
import _ from 'lodash';
import {ERROR_SOMETHING_WENT_WRONG} from '../../config/WebService';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {selectChallengeParticipants} from '../../redux/slicers/chat';
import {getQuotesRequest} from '../../redux/slicers/user';
import {Linking} from 'react-native';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const CHALLENGE_SHARE_MESSAGE =
  "Congratulations! 🎉 I've successfully completed the challenge on RX Life Challenge! 💪 Join me in celebrating this achievement and let's motivate each other to reach new heights together. #ChallengeCompleted #VictoryUnlocked #ProgressInProgress";

const ChallengeDetail = ({route}) => {
  const {params} = route;
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [active, setActive] = useState(true);
  const [screenLoading, setScreenLoading] = useState(params?.fromNotification);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isChallengeImageLoader, setIsChallengeImageLoader] = useState(
    () => true,
  );
  const [itemsChecked, setItemsChecked] = useState([]);
  const [dailyChallengeVideo, setDailyChallengeVideo] = useState('');
  const [selectedDate, setSelectedDate] = useState({});
  const [completeChallengeData, setCompleteChallengeData] = useState({});
  const [allowedEditing, setAllowedEditing] = useState(false);
  const [challengePoint, setChallengePoint] = useState('');
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [shuffledQuote, setShuffledQuote] = useState({quote: '', image: ''});
  const refFlatList = useRef();
  const viewShotRef = useRef();

  const {userData, quotes} = useSelector((state) => state?.user);

  const {allChallenges, ongoingChallenges, myCompletedChallenges} = useSelector(
    (state) => state?.challenge,
  );

  const allCompletedAndOngoingChallenges = [
    ...ongoingChallenges,
    ...myCompletedChallenges,
  ];
  const isMyChallengeIdx = allCompletedAndOngoingChallenges?.findIndex(
    (item) => item?.id == params?.challengeId,
  );
  const isMyChallenge =
    isMyChallengeIdx > -1 ? true : params?.myChallenge ? true : false;

  const challengeData = isMyChallenge
    ? [...ongoingChallenges, ...myCompletedChallenges]?.find(
        (item) => item?.id == params?.challengeId,
      )
    : allChallenges?.find((item) => item?.id == params?.challengeId);

  const dateData = util.generateDateRangeArray(
    challengeData?.startDate,
    challengeData?.endDate,
  );

  useEffect(() => {
    handleGetAllQuotes();

    if (_.isEmpty(challengeData)) return;

    setItemsChecked(challengeData?.task);

    if (isMyChallenge) {
      const allVideos = challengeData?.dailyVideos ?? [];
      if (allVideos?.length > 0) {
        const today = moment().format('DD-MM-YYYY');
        const todayVideo = allVideos?.find((item) => item?.date === today);
        if (todayVideo) {
          setDailyChallengeVideo(todayVideo);
        }
      }

      dispatch(
        getCompleteChallengeRequest({
          payloadData: {
            query: `filters[user][id][$eq]=${userData?.id}&filters[challenge][id][$eq]=${challengeData?.id}&populate=days&populate=days.tasks`,
          },
          responseCallback: (status, response) => {
            if (status) {
              setCompleteChallengeData(response);
              let dateFromFind = null;
              // if challenge is completed show the data of first day
              if (
                moment(moment().format('YYYY-MM-DD'))
                  .utc(false)
                  .isAfter(moment(challengeData?.endDate).utc(false))
              ) {
                dateFromFind = moment(challengeData?.startDate)?.format(
                  'DD-MM-YYYY',
                );
              } else {
                dateFromFind = moment().format('DD-MM-YYYY');
              }

              const findData = response?.days?.find(
                (item) => item?.date === dateFromFind,
              );

              if (findData) {
                setItemsChecked(findData?.tasks);
              }
            }
          },
        }),
      );

      getLeaderboardData();
      // if (moment(challengeData?.endDate).isBefore(moment())) {

      // }
    }
  }, [challengeData, isMyChallenge]);

  useEffect(() => {
    if (params?.fromNotification) {
      dispatch(
        getOneChallengeRequest({
          payloadData: {
            params: params?.challengeId,
            myChallenge: isMyChallenge,
          },
          responseCallback: (status) => {
            if (status) {
              setScreenLoading(false);
            }
          },
        }),
      );
    }
  }, [params?.fromNotification, params?.challengeId]);

  useEffect(() => {
    if (_.isEmpty(challengeData)) return;

    if (!active) {
      if (
        moment()?.isSameOrAfter(moment(challengeData?.startDate)) &&
        moment()?.isSameOrBefore(moment(challengeData?.endDate).add(1, 'day'))
      ) {
        const findDateIndex = dateData?.findIndex(
          (item) => item?.text == moment().format('MMM DD - YYYY'),
        );

        if (findDateIndex > -1) {
          setSelectedDate(dateData[findDateIndex]);
          setTimeout(() => {
            refFlatList?.current?.scrollToIndex?.({
              index: findDateIndex,
              animated: true,
            });
          }, 1000);
        }
      }
    }
  }, [active, challengeData]);

  useEffect(() => {
    if (quotes?.length === 0) return;

    const selectedQuoteIndex = getRandomInt(1, quotes?.length);

    const selectedQuote = quotes?.[selectedQuoteIndex - 1];

    setShuffledQuote({
      image: selectedQuote?.image,
      quote: selectedQuote?.quote,
      quotedBy: selectedQuote?.quotedBy,
    });
  }, [quotes]);

  const handleGetAllQuotes = () => {
    dispatch(
      getQuotesRequest({
        responseCallback: () => {},
      }),
    );
  };

  const navigateToVideoScreen = () => {
    navigate.navigate(SCREENS.HOME.videoScreen, {
      videoUrl: dailyChallengeVideo?.url,
    });
  };

  const getLeaderboardData = () => {
    dispatch(
      getIndiviualLeaderboardRequest({
        payloadData: {
          query: `challengeId=${params?.challengeId}`,
        },
        responseCallback: (status, res) => {
          if (status) {
            setLeaderBoardData(res);
          }
        },
      }),
    );
  };

  const createCompletedChallengeData = (
    completed = false,
    _itemsChecked = itemsChecked,
  ) => {
    const payload = {
      data: {
        user: userData?.id,
        challenge: challengeData?.id,
        days: [
          {
            date: moment().format('YYYY-MM-DD'),
            completed: completed,
            tasks: _itemsChecked?.map((item) => {
              return {
                title: item?.title,
                points: item?.points,
                completed: item?.completed,
              };
            }),
          },
        ],
      },
    };

    dispatch(
      createCompleteChallengeRequest({
        payloadData: payload,
        responseCallback: (status, res) => {
          if (status) {
            setCompleteChallengeData(res);
            getLeaderboardData();
            try {
              if (completed) {
                toggleVisible();
              }
            } catch (error) {
              console.error('responseCallback error ==>>', error);
            }
          }
        },
      }),
    );
  };

  function clickOnRight(index) {
    if (index !== 0) {
      refFlatList?.current?.scrollToIndex?.({
        index: index - 1,
        animated: true,
      });
      setSelectedDate(dateData[index - 1]);

      const findDataInCompleteTasks = completeChallengeData?.days?.find(
        (item) =>
          moment(item?.date, 'DD-MM-YYYY').format('MMM DD - YYYY') ===
          dateData[index - 1]?.text,
      );

      if (
        findDataInCompleteTasks &&
        moment().format('DD-MM-YYYY') === findDataInCompleteTasks?.date &&
        !findDataInCompleteTasks?.completed
      ) {
        setAllowedEditing(true);
      }

      if (findDataInCompleteTasks)
        setItemsChecked(findDataInCompleteTasks?.tasks);
      else {
        setItemsChecked(challengeData?.task);
      }
    }
  }

  const clickOnLeft = (index) => {
    if (dateData.length - 1 !== index) {
      refFlatList?.current?.scrollToIndex?.({
        index: index + 1,
        animated: true,
      });
      setSelectedDate(dateData[index + 1]);
      const findDataInCompleteTasks = completeChallengeData?.days?.find(
        (item) =>
          moment(item?.date, 'DD-MM-YYYY').format('MMM DD - YYYY') ==
          dateData[index + 1]?.text,
      );

      if (
        findDataInCompleteTasks &&
        moment().format('DD-MM-YYYY') === findDataInCompleteTasks?.date &&
        !findDataInCompleteTasks?.completed
      ) {
        // setAllowedEditing(true);
      }

      if (findDataInCompleteTasks)
        setItemsChecked(findDataInCompleteTasks?.tasks);
      else {
        setItemsChecked(challengeData?.task);
        // setAllowedEditing(false);
      }
    }
  };

  const handleJoinChallenge = () => {
    if (!challengeData?.isPaid) {
      // setTimeout(() => {
      //   setIsLoading(false);
      //   util.topAlert('Challenge joined successfully.');
      //   navigate.goBack();
      // });

      setIsLoading(true);

      dispatch(
        joinChallengeRequest({
          payloadData: {
            challengeId: challengeData?.id,
          },
          responseCallback: (status) => {
            if (status) {
              dispatch(
                joinChallengeGroupRequest({
                  payloadData: {
                    challenge_id: challengeData?.id,
                  },
                  responseCallback: () => {
                    setIsLoading(false);
                    util.topAlert('Challenge Joined Successfully.');
                    if (params?.fromNotification) {
                      const navigationState = navigate.getState()?.routes;
                      const screenName =
                        navigationState?.[navigationState?.length - 2]?.name ??
                        navigationState?.[0]?.name ??
                        SCREENS.HOME.home;

                      navigate.navigate(screenName);
                      // navigate.navigate(SCREENS.HOME.notification);
                    } else navigate.navigate(SCREENS.HOME.challenges);
                  },
                }),
              );
            } else {
              setIsLoading(false);
            }
          },
        }),
      );
    } else {
      navigate.navigate(SCREENS.HOME.checkout, {
        challengeId: challengeData?.id,
        fromNotification: params?.fromNotification,
      });
    }
  };

  const handleSetChallengePoints = () => {
    const _completeChallengeData = {...completeChallengeData};

    if (moment(challengeData?.endDate).isBefore(moment())) {
      let points = 0;

      if (_completeChallengeData?.days?.length > 0) {
        for (let day of _completeChallengeData?.days) {
          if (day?.tasks?.length > 0) {
            for (let task of day?.tasks) {
              if (task?.completed) points += task?.points ?? 0;
            }
          } else {
            setChallengePoint('0');
          }
        }
      }

      setChallengePoint(`${points}`);
    } else {
      const todayData = _completeChallengeData?.days?.find(
        (item) =>
          moment(item?.date, 'DD-MM-YYYY').format('MMM DD - YYYY') ===
          moment().format('MMM DD - YYYY'),
      );
      if (todayData) {
        let points = 0;
        if (todayData?.tasks?.length > 0) {
          for (let task of todayData?.tasks) {
            if (task?.completed) points += task?.points ?? 0;
          }
        }

        if (points) {
          setChallengePoint(points < 10 ? `0${points}` : points);
        } else {
          setChallengePoint('0');
        }
      } else {
        setChallengePoint('0');
      }
    }
  };

  const toggleVisible = () => {
    setIsLoading(false);
    if (!isVisible) handleSetChallengePoints();
    setIsVisible(!isVisible);
  };

  const handleMarkAsCompleted = () => {
    try {
      setIsLoading(true);
      if (_.isEmpty(completeChallengeData)) {
        createCompletedChallengeData(true, itemsChecked);
        return;
      }

      const _completeChallengeData = {
        ...completeChallengeData,
      };

      const findDayIdx = _completeChallengeData?.days?.findIndex(
        (item) => item?.date === moment().format('DD-MM-YYYY'),
      );

      if (findDayIdx > -1) {
        _completeChallengeData.days[findDayIdx] = {
          ..._completeChallengeData.days[findDayIdx],
          completed: true,
        };

        const payload = {
          data: {
            days: _completeChallengeData?.days?.map((item) => ({
              ...item,
              date: moment(item?.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
              tasks: item?.tasks?.map((task) => {
                return {
                  title: task?.title,
                  points: task?.points,
                  completed: task?.completed,
                };
              }),
            })),
          },
        };

        setCompleteChallengeData(_completeChallengeData);
        toggleVisible();
        handleUpdateChallengeTask(payload);
      } else {
        _completeChallengeData.days = [
          ..._completeChallengeData.days,
          {
            date: moment().format('DD-MM-YYYY'),
            completed: true,
            tasks: itemsChecked,
            id: uuid(),
          },
        ];

        const payload = {
          data: {
            days: _completeChallengeData?.days?.map((item) => ({
              ...item,
              date: moment(item?.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
              tasks: item?.tasks?.map((task) => {
                return {
                  title: task?.title,
                  points: task?.points,
                  completed: task?.completed,
                };
              }),
            })),
          },
        };

        setCompleteChallengeData(_completeChallengeData);
        toggleVisible();
        handleUpdateChallengeTask(payload);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateChallengeTask = (payload, callback = () => {}) => {
    dispatch(
      updateCompleteChallengeRequest({
        payloadData: payload,
        oldData: completeChallengeData,
        param: completeChallengeData?.id,
        responseCallback: (status, res) => {
          if (status) {
            callback();
            getLeaderboardData();
          } else {
            util.topAlertError(ERROR_SOMETHING_WENT_WRONG.error);
            setCompleteChallengeData(res);
          }
        },
      }),
    );
  };

  const handleToggleCheck = (isChecked, id) => {
    // if (!id) return;

    let allItems = _.cloneDeep(itemsChecked);

    const itemIdx = allItems?.findIndex((item) => item?.id == id);

    if (itemIdx > -1) {
      allItems[itemIdx] = {
        ...allItems[itemIdx],
        completed: isChecked,
      };

      setItemsChecked([...allItems]);

      if (_.isEmpty(completeChallengeData)) {
        createCompletedChallengeData(false, allItems);
        return;
      }

      const _completeChallengeData = {...completeChallengeData};
      const findDayIdx = _completeChallengeData?.days?.findIndex(
        (item) => item?.date === moment().format('DD-MM-YYYY'),
      );

      if (findDayIdx > -1) {
        _completeChallengeData.days[findDayIdx] = {
          ..._completeChallengeData.days[findDayIdx],
          tasks: allItems,
        };

        const payload = {
          data: {
            days: _completeChallengeData?.days?.map((item) => ({
              ...item,
              date: moment(item?.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
              tasks: item?.tasks?.map((task) => {
                // delete task.id;
                return {
                  title: task?.title,
                  points: task?.points,
                  completed: task?.completed,
                };
              }),
            })),
          },
        };

        setCompleteChallengeData(_completeChallengeData);

        handleUpdateChallengeTask(payload);
      } else {
        _completeChallengeData.days = [
          ..._completeChallengeData.days,
          {
            date: moment().format('DD-MM-YYYY'),
            completed: false,
            tasks: allItems,
          },
        ];

        const payload = {
          data: {
            days: _completeChallengeData?.days?.map((item) => ({
              ...item,
              date: moment(item?.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
              tasks: item?.tasks?.map((task) => {
                // delete task.id;
                return {
                  title: task?.title,
                  points: task?.points,
                  completed: task?.completed,
                };
              }),
            })),
          },
        };

        setCompleteChallengeData(_completeChallengeData);

        handleUpdateChallengeTask(payload);
      }
    }
  };

  const handleShare = () => {
    handleCaptureFile((uri) => {
      try {
        if (!util.isPlatformAndroid()) {
          const image = CameraRoll.save(uri, 'photo');
        }

        const shareOptions = {
          title: 'Share via',
          message: CHALLENGE_SHARE_MESSAGE,
          url: uri,
          failOnCancel: false,
        };

        Share.open(shareOptions)
          .then((response) => {
            toggleVisible();
          })
          .catch((err) => {
            console.error('handleShare error ==>>>', err);
            util.topAlertError(
              err?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
            );
          });
      } catch (error) {
        console.error('handleShare error ==>>>', err);
        util.topAlertError(err?.message ?? ERROR_SOMETHING_WENT_WRONG.error);
      }
    });
  };

  const handleShareOnInstagram = () => {
    handleCaptureFile((uri) => {
      if (!util.isPlatformAndroid()) {
        const image = CameraRoll.save(uri, 'photo');
      }
      const shareOptions = {
        url: uri,
        social: Share.Social.INSTAGRAM,
        type: 'image/*',
        failOnCancel: false,
        forceDialog: true,
      };

      Share.shareSingle(shareOptions)
        .then((response) => {
          toggleVisible();
        })
        .catch((err) => {
          console.error('handleShare error ==>>>', err);
          util.topAlertError(err?.message ?? ERROR_SOMETHING_WENT_WRONG.error);
        });
    });
  };

  const handleShareOnMessage = () => {
    handleCaptureFile((uri) => {
      const splittedUri = uri?.split('.');

      const file = {
        type: util.isPlatformAndroid()
          ? 'image/jpeg'
          : splittedUri?.[splittedUri?.length - 1],
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
        name: `challenge_screenshot_${userData?.id}_${
          challengeData?.id
        }_${moment().format('DD-MM-YYYY')}.${
          splittedUri?.[splittedUri?.length - 1]
        }`,
      };

      setIsVisible(false);

      navigate.navigate(SCREENS.HOME.forwardChat, {
        file,
        message: CHALLENGE_SHARE_MESSAGE,
      });
    });
  };

  const handleCaptureFile = (callback = () => {}) => {
    viewShotRef?.current
      ?.capture()
      ?.then?.((uri) => {
        callback(uri);
      })
      ?.catch((err) => {
        console.error('handleCaptureFile error =>>', err);
        util.topAlertError(err?.message ?? ERROR_SOMETHING_WENT_WRONG.error);
      });
  };

  const handleCreateGroup = () => {
    dispatch(selectChallengeParticipants(challengeData?.participantsData));
    navigate.dispatch(
      StackActions.replace(SCREENS.HOME.createGroup, {
        title: challengeData?.title,
        imageUrl: challengeData?.bgImage,
        challengeId: challengeData?.id,
      }),
    );
  };

  const handleOpenExternalLink = (url = '') => {
    Linking.openURL(url).catch(() => {
      util.topAlertError('Invalid URL');
    });
  };

  const shouldAllowEditing = challengeData?.isDaily
    ? challengeData?.startDate === moment().format('YYYY-MM-DD')
      ? true
      : false
    : moment().format('MMM DD - YYYY') === selectedDate?.text
    ? true
    : false;

  return (
    <ChallengeDetailUI
      active={active}
      isLoading={isLoading}
      challengeData={challengeData}
      refFlatList={refFlatList}
      dateData={dateData}
      myChallenge={isMyChallenge}
      leaderBoardData={leaderBoardData}
      isVisible={isVisible}
      selectedDate={selectedDate}
      itemsChecked={itemsChecked}
      allowedEditing={allowedEditing}
      viewShotRef={viewShotRef}
      shouldAllowEditing={shouldAllowEditing}
      challengePoint={challengePoint}
      userData={userData}
      screenLoading={screenLoading}
      shuffledQuote={shuffledQuote}
      dailyChallengeVideo={dailyChallengeVideo}
      // functions
      navigate={navigate}
      setActive={setActive}
      handleJoinChallenge={handleJoinChallenge}
      clickOnLeft={clickOnLeft}
      clickOnRight={clickOnRight}
      handleMarkAsCompleted={handleMarkAsCompleted}
      toggleVisible={toggleVisible}
      handleToggleCheck={handleToggleCheck}
      handleShare={handleShare}
      handleShareOnInstagram={handleShareOnInstagram}
      handleShareOnMessage={handleShareOnMessage}
      handleCreateGroup={handleCreateGroup}
      handleOpenExternalLink={handleOpenExternalLink}
      navigateToVideoScreen={navigateToVideoScreen}
      setIsChallengeImageLoader={setIsChallengeImageLoader}
      isChallengeImageLoader={isChallengeImageLoader}
    />
  );
};

export default ChallengeDetail;
