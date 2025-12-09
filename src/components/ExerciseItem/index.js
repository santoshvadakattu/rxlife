import {Image, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, Images} from '../../theme';
import ButtonView from '../ButtonView';
import Text from '../Text';
import SeperaterView from '../SeperaterView';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';

export default function ExerciseItemp(props) {
  const {isFromExercise} = props || {};
  const navigate = useNavigation();
  return (
    <>
      {isFromExercise ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 5,
                }}>
                <Text
                  size={Fonts.size.xxxxxSmall}
                  type={Fonts.type.base}
                  color={Colors.text.blueGray}
                  style={{fontWeight: '400', lineHeight: 15}}>
                  Running
                </Text>
                <View
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: 1.5,
                    backgroundColor: Colors.text.blueGray,
                  }}
                />
                <Text
                  size={Fonts.size.xxxxxSmall}
                  type={Fonts.type.base}
                  color={Colors.text.blueGray}
                  style={{fontWeight: '400', lineHeight: 15}}>
                  Strength
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  size={Fonts.size.xxxSmall}
                  type={Fonts.type.base}
                  style={{
                    fontWeight: '500',
                    lineHeight: 18,
                  }}>
                  45 minutes
                </Text>
                <ButtonView
                  onPress={() => {
                    navigate.navigate(SCREENS.NUTRITION.createExercise, {
                      isEdit: true,
                    });
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={Images.EditPencil}
                    style={{tintColor: 'black'}}
                  />
                </ButtonView>
              </View>
            </View>
            <Text
              size={Fonts.size.xxxSmall}
              type={Fonts.type.base}
              style={{fontWeight: '500', lineHeight: 18}}>
              cal 450
            </Text>
          </View>
          <SeperaterView />
        </>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 5,
                }}>
                <Text
                  size={Fonts.size.xxxxxSmall}
                  type={Fonts.type.base}
                  color={Colors.text.blueGray}
                  style={{fontWeight: '400', lineHeight: 15}}>
                  45 minutes
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  size={Fonts.size.xxxSmall}
                  type={Fonts.type.base}
                  style={{
                    fontWeight: '500',
                    lineHeight: 18,
                  }}>
                  Archery (non-hunting)
                </Text>
                <ButtonView
                  onPress={() => {
                    navigate.navigate(SCREENS.NUTRITION.createExercise, {
                      isEdit: true,
                    });
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={Images.EditPencil}
                    style={{tintColor: 'black'}}
                  />
                </ButtonView>
              </View>
            </View>
            <Text
              size={Fonts.size.xxxSmall}
              type={Fonts.type.base}
              style={{fontWeight: '500', lineHeight: 18}}>
              cal 450
            </Text>
          </View>
          <SeperaterView />
        </>
      )}
    </>
  );
}
