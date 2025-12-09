import {View, TouchableOpacity, Image, StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import Text from '../Text';
import {useNavigation} from '@react-navigation/native';
import ButtonView from '../ButtonView';

export default function CustomHeaderNutrition(props) {
  const {
    title,
    styleRightImage,
    onPressImageRight,
    ImageRightSource,
    ImageRightSecondSource,
    onPressImageRightSecond,
    styleRightImageSecond,
  } = props;
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

  return (
    <View
      style={{
        width: '100%',
        paddingTop: top + 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 30,
            width: 20,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Image style={{width: 7, height: 12}} source={Images.BackIcon} />
        </TouchableOpacity>
        <Text
          size={16}
          type={Fonts.type.bold}
          color={Colors.black}
          style={{fontWeight: '600'}}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
        }}>
        {ImageRightSecondSource && (
          <ButtonView onPress={onPressImageRightSecond}>
            <Image
              style={styleRightImageSecond}
              source={ImageRightSecondSource}
            />
          </ButtonView>
        )}
        {ImageRightSource && (
          <ButtonView onPress={onPressImageRight}>
            <Image style={styleRightImage} source={ImageRightSource} />
          </ButtonView>
        )}
      </View>
    </View>
  );
}
//
