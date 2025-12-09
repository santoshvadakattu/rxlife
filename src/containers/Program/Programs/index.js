import {View, Image, FlatList} from 'react-native';
import React, {useMemo, useState} from 'react';
import styles from './styles';
import {
  ButtonView,
  CustomNavbar,
  ProgramsItem,
  SectionTabs,
  Text,
} from '../../../components';
import {Colors, Fonts, Images} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constants';

export default function Programs() {
  const navigate = useNavigation();
  const [active, setActive] = useState('Programs');

  const renderHeader = useMemo(() => {
    return <CustomNavbar hasBorder={false} title={'Programs'} />;
  }, []);

  return (
    <View style={styles.container}>
      {renderHeader}
      <SectionTabs
        title1={'Programs'}
        title2={'My Programs'}
        title3={'Completed'}
        active={active}
        setActive={setActive}
      />
      {active == 'Programs' && (
        <>
          <ButtonView
            onPress={() => {
              // navigate.navigate(SCREENS.HOME.challengesSearch);
            }}
            style={[styles.field]}>
            <Image source={Images.Search} style={styles.imageStyle} />
            <Text
              size={Fonts.size.xSmall}
              type={Fonts.type.base}
              color={Colors.placeHolderColor}>
              Search Program
            </Text>
          </ButtonView>
          <FlatList
            data={[1, 2, 3]}
            showsVerticalScrollIndicator={false}
            renderItem={() => {
              return (
                <ProgramsItem
                  onPress={() => {
                    navigate.navigate(SCREENS.PROGRAMS.programsDetails, {
                      isLock: true,
                      value: 30,
                    });
                  }}
                />
              );
            }}
          />
        </>
      )}
      {active == 'My Programs' && (
        <>
          <ButtonView
            onPress={() => {
              // navigate.navigate(SCREENS.HOME.challengesSearch);
            }}
            style={[styles.field]}>
            <Image source={Images.Search} style={styles.imageStyle} />
            <Text
              size={Fonts.size.xSmall}
              type={Fonts.type.base}
              color={Colors.placeHolderColor}>
              Search Program
            </Text>
          </ButtonView>
          <FlatList
            data={[1, 2, 3]}
            showsVerticalScrollIndicator={false}
            renderItem={() => {
              return (
                <ProgramsItem
                  onPress={() => {
                    navigate.navigate(SCREENS.PROGRAMS.programsDetails, {
                      isLock: false,

                      value: 30,
                    });
                  }}
                />
              );
            }}
          />
        </>
      )}
      {active == 'Completed' && (
        <>
          <ButtonView
            onPress={() => {
              // navigate.navigate(SCREENS.HOME.challengesSearch);
            }}
            style={[styles.field]}>
            <Image source={Images.Search} style={styles.imageStyle} />
            <Text
              size={Fonts.size.xSmall}
              type={Fonts.type.base}
              color={Colors.placeHolderColor}>
              Search Program
            </Text>
          </ButtonView>
          <FlatList
            data={[1, 2]}
            showsVerticalScrollIndicator={false}
            renderItem={() => {
              return (
                <ProgramsItem
                  onPress={() => {
                    navigate.navigate(SCREENS.PROGRAMS.programsDetails, {
                      isLock: false,
                      isCompleted: true,
                      value: 100,
                    });
                  }}
                />
              );
            }}
          />
        </>
      )}
    </View>
  );
}
