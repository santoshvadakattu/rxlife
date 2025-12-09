import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import Button from '../Button';
import CarouselListArrow from '../CarouselListArrow';
import Text from '../Text';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import LeaderBoardPerson from '../LeaderBoardPerson';
import {useDispatch, useSelector} from 'react-redux';
import GoalCheckItem from '../GoalCheckItem';
import _ from 'lodash';
import moment from 'moment';
import {updateDashboardTasksRequest} from '../../redux/slicers/challenge';
import util from '../../util';
import {ERROR_SOMETHING_WENT_WRONG} from '../../config/WebService';
import {SCREENS} from '../../constants';

export default function OngoingTasks() {
  const refFlatlist = useRef(null);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsChecked, setItemsChecked] = useState([]);

  const {ongoingTasks} = useSelector((state) => state?.challenge);

  useEffect(() => {
    setItemsChecked(ongoingTasks[currentIndex]?.tasks ?? []);
  }, [currentIndex, ongoingTasks]);

  function clickOnRight(index) {
    if (index !== 0) {
      refFlatlist?.current?.scrollToIndex({
        index: index - 1,
        animated: true,
      });
      setCurrentIndex(index - 1);
    }
  }
  function clickOnLeft(index) {
    if (ongoingTasks?.length - 1 !== index) {
      refFlatlist?.current?.scrollToIndex({
        index: index + 1,
        animated: true,
      });
      setCurrentIndex(index + 1);
    }
  }

  const handleUpdateChallengeTask = (
    payload,
    allItems,
    callback = () => {},
  ) => {
    dispatch(
      updateDashboardTasksRequest({
        payloadData: payload,
        allItems,
        currentIndex,
        responseCallback: (status, res) => {
          if (status) {
            callback();
          } else {
            util.topAlertError(ERROR_SOMETHING_WENT_WRONG.error);
          }
        },
      }),
    );
  };

  const handleToggleCheck = (isChecked, id) => {
    let allItems = _.cloneDeep(itemsChecked);

    const itemIdx = allItems?.findIndex((item) => item?.id == id);

    if (itemIdx > -1) {
      allItems[itemIdx] = {
        ...allItems[itemIdx],
        completed: isChecked,
      };

      setItemsChecked([...allItems]);

      const payload = {
        day: {
          date: moment().format('DD-MM-YYYY'),
          tasks: allItems?.map((task) => {
            // delete task.id;
            return {
              title: task?.title,
              points: task?.points,
              completed: task?.completed,
            };
          }),
          isCompleted: false,
        },
        challengeId: ongoingTasks[currentIndex]?.id,
      };

      handleUpdateChallengeTask(payload, allItems);
    }
  };

  const renderTasks = () => {
    return (
      <View style={[AppStyles.flex7, styles.descContainer]}>
        <FlatList
          data={itemsChecked}
          renderItem={({item}) => (
            <View
              style={[
                AppStyles.flex,
                AppStyles.flexRow,
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        color={Colors.black2}
        type={Fonts.type.base}
        size={16}
        style={{fontWeight: '600'}}>
        Ongoing Challenges Tasks
      </Text>
      <View style={{justifyContent: 'space-between'}}>
        <CarouselListArrow
          data={ongoingTasks}
          clickOnLeft={clickOnLeft}
          clickOnRight={clickOnRight}
          refFlatlist={refFlatlist}
          setCurrentIndex={() => {}}
        />
        {renderTasks()}
        <Button
          onPress={() =>
            navigate.navigate(SCREENS.HOME.challengeDetail, {
              challengeId: ongoingTasks[currentIndex]?.id,
              myChallenge: true,
              fromNotification: true,
            })
          }
          title={'See All'}
          style={styles.btnStyle}
          textStyle={styles.txtStyle}
        />
      </View>
    </View>
  );
}
