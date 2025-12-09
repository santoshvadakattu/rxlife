import {FlatList, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import styles from './styles';
import {Button, CustomNavbar, Text} from '../../../components';
import {AppStyles, Colors, Fonts} from '../../../theme';
import GoalsAnswerItem from '../../../components/GoalsAnswerItem';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constants';
import util from '../../../util';
import {useDispatch} from 'react-redux';
import {loginUserRequest} from '../../../redux/slicers/user';

export default function SetGoals() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [selectedGoals, setSelectedGoals] = useState([]);
  let array = ['Fitness Goals', 'Nutrition Tracker'];
  const renderCustomerNavbar = useMemo(() => {
    return (
      <View>
        <CustomNavbar
          hasBorder={false}
          title={'Goals'}
          titleColor={Colors.black}
        />
      </View>
    );
  }, []);

  const handleGoalPress = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((item) => item !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const rerderSaveBtn = () => {
    return (
      <View style={{marginBottom: 20}}>
        <Button
          title="Next"
          onPress={() => {
            let conditon = array.map((item) => selectedGoals.includes(item));
            if (conditon.some((item) => item === true)) {
              navigate.navigate(SCREENS.GOALS.setGoalsTarget);
            } else {
              dispatch(loginUserRequest());
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
          <FlatList
            data={['Take Challenges', 'Fitness Goals', 'Nutrition Tracker']}
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
