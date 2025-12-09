import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Colors, Fonts, Images} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../Text';
import styles from './styles';
import ModalCancel from '../ModalCancel';

export default function NutritionListItem(props) {
  const {
    isAdd,
    name,
    des,
    Kcal,
    onPress,
    onPressIcon,
    isSave,
    iconImageSource,
    isDeleteVisible,
    setIsDeleteVisible,
    handleDelete,
    isAddQuick,
    onPressDelete,
    onPressEdit,
    fdcId,
    addFromUSDA,
    imageUrl,
  } = props || {};

  return (
    <TouchableOpacity
      onPress={() => {
        !isAddQuick && onPress();
      }}>
      {isAddQuick ? (
        <View style={styles.addQuickView}>
          <View style={{flex: 0.8}}>
            <Text
              size={12}
              type={Fonts.type.base}
              color={Colors.black}
              numberOfLines={1}
              style={{
                fontWeight: '500',
                lineHeight: 18,
              }}>
              Quick Added {name}
            </Text>
            {Kcal && (
              <Text
                size={10}
                type={Fonts.type.base}
                color={Colors.text.blueGray}
                style={{fontWeight: '500', lineHeight: 21}}>
                {Kcal}
              </Text>
            )}
          </View>

          <View style={{flexDirection: 'row', gap: 6}}>
            {isAdd ? (
              <TouchableOpacity
                onPress={onPressIcon}
                style={{
                  height: 20,
                  width: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    tintColor: 'red',
                  }}
                  source={iconImageSource}
                />
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  onPress={onPressDelete}
                  style={{
                    height: 20,
                    width: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{width: 10, height: 12, tintColor: 'red'}}
                    source={Images.Trash}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPressEdit}
                  style={{
                    height: 20,
                    width: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{tintColor: '#36405B'}}
                    source={Images.EditPencil}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPressIcon}
                  style={{
                    height: 20,
                    width: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image style={{}} source={iconImageSource} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      ) : (
        <ImageBackground
          source={imageUrl ? {uri: imageUrl} : Images.dummyImage3}
          imageStyle={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
          }}
          resizeMode="cover"
          style={styles.container}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={styles.LinearView}>
            <View style={styles.desView}>
              <View style={{width: '90%'}}>
                <Text
                  size={14}
                  type={Fonts.type.base}
                  color={Colors.white}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontWeight: '500',
                    lineHeight: 21,
                    // width: 280,
                  }}>
                  {name}
                </Text>
                {des && (
                  <Text
                    size={10}
                    type={Fonts.type.base}
                    color={Colors.white}
                    style={{fontWeight: '400', lineHeight: 15}}>
                    {des}
                  </Text>
                )}
                {Kcal && (
                  <Text
                    size={14}
                    type={Fonts.type.base}
                    color={Colors.white}
                    style={{fontWeight: '500', lineHeight: 21}}>
                    {Kcal}
                  </Text>
                )}
              </View>
              {isSave ? (
                <View style={{flexDirection: 'row', gap: 6}}>
                  <TouchableOpacity
                    onPress={onPressDelete}
                    style={{
                      height: 20,
                      width: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        width: 14,
                        height: 14,
                      }}
                      source={Images.Trash}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onPressEdit}
                    style={{
                      height: 20,
                      width: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={Images.EditPencil} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={onPressIcon}
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{tintColor: 'white'}}
                    source={iconImageSource}
                  />
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        </ImageBackground>
      )}
    </TouchableOpacity>
  );
}
