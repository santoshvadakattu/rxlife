import {FlatList, FlatListComponent, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Button, CustomNavbar, Text} from '../../../components';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import GoalsAnswerItem from '../../../components/GoalsAnswerItem';
import {NUTRITION_GOALS_DATA_SET, SCREENS} from '../../../constants';
import util from '../../../util';

export default function GoalDepanderQuestions({route}) {
  const {goal} = route.params || {};

  const filterData = NUTRITION_GOALS_DATA_SET.find((item) => item.goal == goal);

  const [selectedGoals, setSelectedGoals] = useState([]);
  const navigate = useNavigation();

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

  const rerderSaveBtn = () => {
    return (
      <View style={{marginBottom: 20}}>
        <Button
          title="Next"
          onPress={() => {
            if (selectedGoals?.length === 0) {
              util.topAlertError('Please select atleast one goal');
            } else {
              navigate.navigate(SCREENS.GOALS.goalsActivityLevel);
            }
          }}
          style={styles.btnStyle}
        />
      </View>
    );
  };

  const handleGoalPress = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((item) => item !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  return (
    <View style={styles.container}>
      {renderCustomerNavbar}
      <View
        style={[AppStyles.mTop15, {flex: 1, justifyContent: 'space-between'}]}>
        <View style={{flex: 1}}>
          <Text
            size={20}
            type={Fonts.type.base}
            color={Colors.black}
            style={{fontWeight: '600'}}>
            {filterData?.question}
          </Text>
          <FlatList
            data={filterData?.answers}
            style={[AppStyles.mTop15]}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
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
