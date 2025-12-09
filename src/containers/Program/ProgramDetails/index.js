import {FlatList, View} from 'react-native';
import React, {useMemo, useRef} from 'react';
import {
  Button,
  CarouselListArrow,
  CustomNavbar,
  ProgramDayItem,
  ProgramsItem,
  Text,
} from '../../../components';
import {Fonts, Images} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {SCREENS} from '../../../constants';
import util from '../../../util';

export default function ProgramsDetails({route}) {
  const {isLock, isCompleted, value} = route.params;
  const navigate = useNavigation();
  const refFlatlist = useRef(null);
  const renderNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title={'Programs'}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
        rightBtnPressSecond={() => {}}
        rightBtnPress={() => {}}
      />
    );
  }, []);
  const WeeksData = util.getCurrentMonthWeeks();

  function clickOnRight(index) {
    if (index !== 0) {
      refFlatlist?.current?.scrollToIndex({
        index: index - 1,
        animated: true,
      });
    }
  }
  function clickOnLeft(index) {
    if (WeeksData?.length - 1 !== index) {
      refFlatlist?.current?.scrollToIndex({
        index: index + 1,
        animated: true,
      });
    }
  }

  const renderIntroduc = () => {
    return (
      <View style={styles.introView}>
        <Text
          size={16}
          type={Fonts.type.base}
          style={{fontWeight: 600, lineHeight: 21}}>
          Introduction
        </Text>
        <Text
          size={14}
          type={Fonts.type.base}
          style={{fontWeight: '400', lineHeight: 21}}>
          Lorem ipsum dolor sit amet, cons ectetur adipiscing elit Lorem ipsum
          ectetur adipiscing elit.Lorem ipsum dolor sit amet, cons ectetur
          adipiscing elit Lorem ipsum ectetur adipiscing elit.
        </Text>
      </View>
    );
  };

  const renderDays = () => {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5]}
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 10, marginTop: 10}}
        contentContainerStyle={{paddingBottom: 10, flexGrow: 1}}
        renderItem={({item}) => {
          return (
            <ProgramDayItem
              title={`Day ${item}`}
              des={`${item + 5} min`}
              isLock={isLock}
              value={value}
            />
          );
        }}
      />
    );
  };

  const renderBtn = () => {
    return (
      <Button
        onPress={() => {
          navigate.navigate(SCREENS.PROGRAMS.paymentMethod);
        }}
        title={'Buy Now'}
        style={styles.btnStyle}
      />
    );
  };

  const renderBtnComplete = () => {
    return (
      <Button
        onPress={() => {
          navigate.goBack();
        }}
        title={'Do it Again'}
        style={styles.btnStyle}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderNav}
      <ProgramsItem />
      {renderIntroduc()}
      {isCompleted && (
        <CarouselListArrow
          data={WeeksData}
          clickOnLeft={clickOnLeft}
          clickOnRight={clickOnRight}
          refFlatlist={refFlatlist}
          styleView={styles.CarouseView}
          setCurrentIndex={() => {}}
        />
      )}
      {renderDays()}
      {isLock && renderBtn()}
      {isCompleted && renderBtnComplete()}
    </View>
  );
}
