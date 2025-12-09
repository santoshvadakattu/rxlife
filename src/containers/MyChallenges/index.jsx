import React, {useEffect, useState} from 'react';
import MyChallengesUI from './MyChallengesUI';
import {
  DrawerActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {MY_CHALLENGES} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMyCompletedChallengesPaginationRequest,
  getMyCompletedChallengesRequest,
  getOnGoingChallengesPaginationRequest,
  getOnGoingChallengesRequest,
} from '../../redux/slicers/challenge';
import {getUnReadChatRequest} from '../../redux/slicers/chat';

const MyChallenges = () => {
  const navigate = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [active, setActive] = useState(() => 'Challenges');
  const [isLoading, setIsLoading] = useState(true);
  const [isPullToref, setIsPullToRef] = useState(() => false);

  const {ongoingChallenges, myCompletedChallenges} = useSelector(
    (state) => state?.challenge,
  );
  const {userData} = useSelector((state) => state?.user);
  const {isUnread} = useSelector((state) => state?.chat);

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      if (active == 'Ongoing') initialRequest();
      else {
        getMyCompletedChallenges();
      }

      dispatch(
        getUnReadChatRequest({
          headers: {
            Authorization: `Bearer ${userData?.chatUserId}`,
          },
          responseCallback: () => {},
        }),
      );
    }
  }, [isFocused, active]);

  const initialRequest = () => {
    dispatch(
      getOnGoingChallengesRequest({
        payloadData: {
          query: '',
        },
        responseCallback: () => {
          setIsLoading(false);
          setIsPullToRef(false);
        },
      }),
    );
  };

  const getMyCompletedChallenges = () => {
    dispatch(
      getMyCompletedChallengesRequest({
        payloadData: {
          query: '',
        },
        responseCallback: () => {
          setIsLoading(false);
          setIsPullToRef(false);
        },
      }),
    );
  };

  const pullToRefresh = () => {
    setIsPullToRef(true);
    if (active == 'Ongoing') initialRequest();
    else getMyCompletedChallenges();
  };

  const getMoreChallenges = () => {
    if (active == 'Ongoing')
      dispatch(
        getOnGoingChallengesPaginationRequest({
          payloadData: {
            query: `start=${ongoingChallenges?.length}`,
          },
          responseCallback: () => {
            setIsLoading(false);
          },
        }),
      );
    else
      dispatch(
        getMyCompletedChallengesPaginationRequest({
          payloadData: {
            query: `start=${myCompletedChallenges?.length}`,
          },
          responseCallback: () => {
            setIsLoading(false);
            setIsPullToRef(false);
          },
        }),
      );
  };

  const openDrawer = () => {
    navigate.dispatch(DrawerActions.openDrawer());
  };

  const filteredChallenges =
    active == 'Ongoing' ? ongoingChallenges : myCompletedChallenges;

  return (
    <MyChallengesUI
      navigate={navigate}
      active={active}
      filteredChallenges={filteredChallenges}
      isLoading={isLoading}
      isPullToref={isPullToref}
      userData={userData}
      isUnread={isUnread}
      // functions
      setActive={setActive}
      openDrawer={openDrawer}
      getMoreChallenges={getMoreChallenges}
      pullToRefresh={pullToRefresh}
    />
  );
};

export default MyChallenges;
