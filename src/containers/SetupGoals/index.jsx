import React, {useEffect, useState} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import SetupGoalsUI from './SetupGoalsUI';
import {GOALS, SCREENS} from '../../constants';
import {
  addUserGoalsRequest,
  getAllGoalsRequest,
  loginUserRequest,
  profileSetUpRequest,
  uploadMediaRequest,
} from '../../redux/slicers/user';
import {useDispatch, useSelector} from 'react-redux';
import {setGoalFromSignUp} from '../../redux/slicers/general';

const SetupGoals = ({route}) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  // Input states
  const [itemsChecked, setItemsChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const {userData} = useSelector((state) => state.user);

  // Error states

  // REFS

  const handleToggleCheck = (isChecked, id) => {
    const allItems = [...itemsChecked];
    const itemIdx = allItems?.findIndex((item) => item?.id === id);

    if (itemIdx > -1) {
      allItems[itemIdx] = {
        ...allItems[itemIdx],
        isChecked: isChecked,
      };

      setItemsChecked(allItems);
    }
  };

  useEffect(() => {
    dispatch(
      getAllGoalsRequest({
        payloadData: {},
        responseCallback: (status, response) => {
          setIsLoadingData(false);
          setItemsChecked(response.data);
        },
      }),
    );
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    let tempArrChecked = [];
    let tempArrUnChecked = [];
    const checkItems = itemsChecked.filter((item) => {
      if (item.isChecked) {
        tempArrChecked.push(item.id);
      } else {
        tempArrUnChecked.push(item.id);
      }
    });
    const payload = {
      data: {
        goals: {
          disconnect: tempArrUnChecked,
          connect: tempArrChecked,
        },
      },
      userId: userData?.id,
    };
    dispatch(
      addUserGoalsRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          setIsLoading(false);
          if (status) {
            dispatch(setGoalFromSignUp(true));
            navigate.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: SCREENS.GOALS.setGoals}],
              }),
            );
          }
        },
      }),
    );
  };
  function skipBtnOnpress() {
    // dispatch(loginUserRequest());
    dispatch(setGoalFromSignUp(true));
    navigate.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: SCREENS.GOALS.setGoals}],
      }),
    );
  }

  return (
    <SetupGoalsUI
      // hooks
      navigate={navigate}
      // states
      allItems={itemsChecked}
      // REFS
      // functions
      handleToggleCheck={handleToggleCheck}
      isLoadingData={isLoadingData}
      handleSubmit={handleSubmit}
      skipBtnOnpress={skipBtnOnpress}
      isLoading={isLoading}
    />
  );
};

export default SetupGoals;
