import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Button, CustomNavbar, Text} from '../../../components';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constants';
import styles from './styles';
import GoalsAnswerItem from '../../../components/GoalsAnswerItem';
import util from '../../../util';

export default function GoalsActivityLevel() {
  const [selectedGoals, setSelectedGoals] = useState({});
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
              util.topAlertError('Please select atleast one Activity Level');
            } else {
              navigate.navigate(SCREENS.GOALS.goalYourself, {
                activityValue: selectedGoals?.value,
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
            What is your baseline activity level?
          </Text>
          <FlatList
            data={[
              {type: 'Sedentary (little or no exercise)', value: 1.2},
              {type: 'Lightly active (exercise 1-3 days/week)', value: 1.375},
              {type: 'Moderately active (exercise 3-5 days/week)', value: 1.55},
              {type: 'Active (exercise 6-7 days/week)', value: 1.725},
              {type: 'Very active (hard exercise 6-7 days/week)', value: 1.9},
            ]}
            style={AppStyles.mTop15}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedGoals(item)}
                  style={[
                    styles.containerItem,
                    selectedGoals.type == item.type && {
                      borderColor: '#0D82FF',
                      borderWidth: 1,
                    },
                  ]}>
                  <View style={{flex: 0.9}}>
                    <Text
                      size={14}
                      allowFontScaling={false}
                      type={Fonts.type.base}
                      style={{fontWeight: '500', lineHeight: 21}}>
                      {item.type}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.1,
                      alignItems: 'flex-end',
                      padding: 4,
                    }}>
                    <Image
                      style={{width: 21, height: 21}}
                      source={
                        selectedGoals.type == item.type
                          ? Images.crossGoalIcon
                          : Images.AddGoalIcon
                      }
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {rerderSaveBtn()}
      </View>
    </View>
  );
}
