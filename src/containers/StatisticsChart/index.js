import {ScrollView, View} from 'react-native';
import React, {useMemo} from 'react';
import {
  ChallengesList,
  CustomNavbar,
  StatisticsBarChart,
} from '../../components';
import {Colors, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

export default function StatisticsChart({route}) {
  const {item} = route.params;
  const navigate = useNavigation();
  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title={'Statistics'}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
      />
    );
  }, []);

  const renderChallenges = () => {
    return <ChallengesList data={[1, 2, 3, 4, 4, 5, 55, 56]} />;
  };

  return (
    <View style={styles.container}>
      {renderCustomNav}

      <StatisticsBarChart
        title={item.title}
        des={item.value}
        color={Colors.background.primary}
      />
      {item.title == 'Challenges Completed' && renderChallenges()}
    </View>
  );
}
