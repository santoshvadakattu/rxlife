import {FlatList, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Button, CustomNavbar, Text} from '../../../components';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import GoalsAnswerItem from '../../../components/GoalsAnswerItem';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constants';
import util from '../../../util';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDataRequest} from '../../../redux/slicers/user';

export default function SetGoalsTarget() {
  const {userData} = useSelector((state) => state.user);
  const arrayGoals = [
    'Loss Weight',
    'Maintain Weight',
    'Gain Weight',
    'Gain Muscle',
    'Modify My Diet',
    'Manage Stress',
    'Increase My Step Count',
  ];
  const [selectedGoals, setSelectedGoals] = useState([]);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const payload = {
      userId: userData.id,
    };
    dispatch(
      getUserDataRequest({
        payloadData: payload,
        responseCallback: () => {},
      }),
    );
  }, []);

  const renderCustomerNavbar = useMemo(() => {
    return (
      <View>
        <CustomNavbar
          hasBorder={false}
          title={'Goals'}
          leftBtnImage={Images.LeftArrow}
          leftBtnPress={() => navigate.goBack()}
          titleColor={Colors.black}
        />
      </View>
    );
  }, []);
  function containsKeyword(array, string) {
    const keyword = 'Weight';

    if (string.includes(keyword)) {
      return array.some((element) => element.includes(keyword));
    }

    return false;
  }

  const handleGoalPress = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((item) => item !== goal));
    } else {
      console.log({selectedGoals, goal});

      if (containsKeyword(selectedGoals, goal)) {
        console.log('You have already selected a weight goal');
        util.topAlertError('You have already selected a weight goal');
      } else {
        console.log('feegree');
        setSelectedGoals([...selectedGoals, goal]);
      }
    }
  };

  const rerderSaveBtn = () => {
    return (
      <View style={{marginBottom: 20}}>
        <Button
          title="Next"
          onPress={() => {
            if (selectedGoals.length === 0) {
              util.topAlertError('Please select atleast one goal');
            } else {
              navigate.navigate(SCREENS.GOALS.goalDepanderQuestions, {
                goal: selectedGoals[0],
              });
            }
          }}
          style={styles.btnStyle}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCustomerNavbar}
      <View
        style={[AppStyles.mTop15, {flex: 1, justifyContent: 'space-between'}]}>
        <View>
          <Text
            size={20}
            type={Fonts.type.base}
            color={Colors.black}
            style={{fontWeight: '600'}}>
            Let’s start with goals
          </Text>
          <Text
            size={12}
            type={Fonts.type.base}
            color={Colors.text.blueGray}
            style={{fontWeight: '400'}}>
            Select up to 3 that are important to you, including one weight goal.
          </Text>
          <FlatList
            data={arrayGoals}
            style={AppStyles.mTop15}
            renderItem={({item}) => {
              return (
                <GoalsAnswerItem
                  title={item}
                  isActive={selectedGoals.includes(item)}
                  onPress={handleGoalPress}
                />
              );
            }}
          />
        </View>
        {rerderSaveBtn()}
      </View>
    </View>
  );
}
