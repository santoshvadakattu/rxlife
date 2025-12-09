import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  CustomNavbar,
  GoalCheckItem,
  KeyboardAwareScrollViewComponent,
} from '../../components';
import {
  addUserGoalsRequest,
  getAllGoalsRequest,
  getUserGoalsRequest,
  loginUserRequest,
} from '../../redux/slicers/user';
import {AppStyles, Colors, Images} from '../../theme';
import styles from './styles';
import util from '../../util';

const SetupUserGoals = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  // Input states
  const [itemsChecked, setItemsChecked] = useState([]);
  const [userGoals, setUserGoals] = useState([]);
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
        responseCallback: (status, allGoalsresponse) => {
          setIsLoadingData(false);
          setItemsChecked(allGoalsresponse.data);
          if (status) {
            const payload = {
              userId: userData.id,
            };
            dispatch(
              getUserGoalsRequest({
                payloadData: payload,
                responseCallback: (status, response) => {
                  if (status) {
                    setUserGoals(response);
                    markSelectedGoals(allGoalsresponse.data, response);
                  }
                },
              }),
            );
          }
        },
      }),
    );
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    let tempArrChecked = [];
    let tempArrUnChecked = [];
    itemsChecked.filter((item) => {
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
            navigate.goBack();
          }
        },
      }),
    );
  };

  function markSelectedGoals(allGoals, selectedGoals) {
    const tempallGoals = util.cloneDeep(allGoals);
    let selectedGoalIds = [];
    selectedGoals.map((item) => {
      selectedGoalIds.push(item.id);
    });
    let tempArray = [];
    tempArray = tempallGoals.map((goal) => {
      if (selectedGoalIds.includes(goal.id)) {
        return {
          ...goal,
          isChecked: true,
        };
      } else {
        return {...goal, isChecked: false};
      }
    });
    setItemsChecked(tempArray);
  }

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Tell us your goals'}
        titleColor={Colors.black}
        hasBack={true}
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
      />

      <KeyboardAwareScrollViewComponent
        scrollEnabled={true}
        style={{flex: 1}}
        containerStyle={styles.contentWrapper}>
        {isLoadingData ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <FlatList
            data={itemsChecked}
            showsVerticalScrollIndicator={false}
            style={AppStyles.pTop20}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
            renderItem={({item}) => {
              return (
                <GoalCheckItem
                  title={item?.attributes?.title}
                  itemId={item?.id}
                  handleToggleCheck={handleToggleCheck}
                  isChecked={item.isChecked}
                />
              );
            }}
          />
        )}
      </KeyboardAwareScrollViewComponent>
      <View style={{marginBottom: 30, backgroundColor: Colors.white}}>
        <Button
          indicatorColor={'white'}
          isLoading={isLoading}
          title="Done"
          onPress={handleSubmit}
          disabled={isLoadingData}
          style={{marginTop: 0}}
        />
      </View>
    </View>
  );
};

export default SetupUserGoals;
