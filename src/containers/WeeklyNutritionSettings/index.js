import {FlatList, Image, View} from 'react-native';
import React, {useState} from 'react';
import {ButtonView, CustomHeaderNutrition, Text} from '../../components';
import styles from './styles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';

export default function WeeklyNutritionSettings() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const arrayData = [
    '7 Days ago',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const renderNutritentItemRow = (name, value) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
            {name}
          </Text>
          <ButtonView
            style={{
              borderWidth: 1,
              borderColor: toggleCheckBox
                ? Colors.background.primary
                : Colors.text.primary,
              backgroundColor: toggleCheckBox
                ? Colors.background.primary
                : Colors.white,
              height: 18,
              width: 18,
              borderRadius: 6,
              ...AppStyles.centerInner,
            }}
            onPress={() => setToggleCheckBox(!toggleCheckBox)}>
            {toggleCheckBox && (
              <Image
                source={Images.Check}
                style={{tintColor: Colors.white, height: 9, width: 12}}
              />
            )}
          </ButtonView>
        </View>
      </>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderWeek = () => {
    return (
      <View style={styles.weekView}>
        <FlatList
          data={arrayData}
          renderItem={({item, index}) => {
            return (
              <View>
                {renderNutritentItemRow(item)}
                {index + 1 != arrayData.length && renderSeparator()}
              </View>
            );
          }}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={'Weekly Nutrition Settings'} />
      {renderWeek()}
    </View>
  );
}
