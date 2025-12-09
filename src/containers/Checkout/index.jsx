import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {CHALLENGES, SCREENS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import util from '../../util';
import {setCardDetail} from '../../redux/slicers/user';
import {
  joinChallengeGroupRequest,
  joinChallengeRequest,
} from '../../redux/slicers/challenge';
import CheckoutUI from './CheckoutUI';
import {removePaymentMethodRequest} from '../../redux/slicers/payment';

const Checkout = (props) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {route} = props;
  const {params} = route;

  const {allChallenges} = useSelector((state) => state?.challenge);
  const isCardAdded = useSelector((state) => state?.user?.isCardAdded);
  const {paymentMethods} = useSelector((state) => state?.payment);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState({});
  const [methodDeleteLoading, setMethodDeleteLoading] = useState(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);

  const handleAddMethod = () => {
    navigate.navigate(SCREENS.HOME.paymentMethod);
  };

  const challengeData =
    allChallenges?.length > 0
      ? allChallenges.find((item) => item?.id == params?.challengeId)
      : {};

  const handleSubmit = () => {
    if (challengeData?.isPaid && !paymentMethods?.length) {
      util.topAlertError('Add payment method');
      return;
    }

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
                    // navigate.navigate(SCREENS.HOME.notification);

                    const navigationState = navigate.getState()?.routes;
                    const screenName =
                      navigationState?.[navigationState?.length - 3]?.name ??
                      navigationState?.[0]?.name ??
                      SCREENS.HOME.home;

                    navigate.navigate(screenName);
                  } else {
                    navigate.navigate(SCREENS.HOME.challenges);
                  }
                },
              }),
            );
          } else {
            setIsLoading(false);
          }
        },
      }),
    );
  };

  const removeCard = () => {
    // dispatch(setCardDetail(false));
    setMethodDeleteLoading(true);
    dispatch(
      removePaymentMethodRequest({
        payloadData: {
          paymentMethodId: selectedMethod?.id,
        },
        responseCallback: (status) => {
          setSelectedMethod(false);
          setMethodDeleteLoading(false);
        },
      }),
    );
  };

  return (
    <CheckoutUI
      challengeData={challengeData}
      isCardAdded={isCardAdded}
      isLoading={isLoading}
      paymentMethods={paymentMethods}
      selectedMethod={selectedMethod}
      isDeleteModalShow={isDeleteModalShow}
      methodDeleteLoading={methodDeleteLoading}
      // functions
      navigate={navigate}
      removeCard={removeCard}
      handleAddMethod={handleAddMethod}
      handleSubmit={handleSubmit}
      setIsDeleteModalShow={setIsDeleteModalShow}
      setSelectedMethod={setSelectedMethod}
    />
  );
};

export default Checkout;
