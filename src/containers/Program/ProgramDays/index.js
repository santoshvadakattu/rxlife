import {FlatList, View} from 'react-native';
import React, {useMemo} from 'react';
import {CustomNavbar, ProgramDayVideoItem, Text} from '../../../components';
import styles from './styles';
import {Images} from '../../../theme';
import {useNavigation} from '@react-navigation/native';

export default function ProgramDays({route}) {
  const {title} = route.params;
  const navigate = useNavigation();
  const renderNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title={title}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
        rightBtnPressSecond={() => {}}
        rightBtnPress={() => {}}
      />
    );
  }, []);

  const renderDaysData = () => {
    return (
      <FlatList
        data={[1, 2, 3, 4]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}
        renderItem={() => {
          return (
            <ProgramDayVideoItem
              text={`Lorem ipsum dolor sit amet, cons ectetur adipiscing elit Lorem ipsum  ectetur adipiscing elit. Lorem ipsum dolor sit amet, cons ectetu adipiscing elitLorem ipsum ectetur adipiscing elit amet, con Lorem ipsum ectetur adipiscing elit amet, con Lorem ipsum ectetur adipiscing elit amet, cons.`}
              maxLength={200}
            />
          );
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderNav}
      {renderDaysData()}
    </View>
  );
}
