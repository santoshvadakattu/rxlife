import {Image, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import styles from './styles';
import {
  Button,
  CustomNavbar,
  DatePicker,
  DatePickerModal,
  KeyboardAwareScrollViewComponent,
  Text,
  TextInput,
} from '../../components';
import {Colors, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {handleSelectImagePress} from '../../Helper/handleSelectImagePress';

export default function AddWeight({route}) {
  const {addTracker} = route.params;
  const [date, setDate] = useState('');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [Weight, setWeight] = useState('');
  const [BodyFat, setBodyFat] = useState('');
  const [BMI, setBMI] = useState('');
  const [Weist, setWeist] = useState('');
  const [Chest, setChest] = useState('');
  const [Arm, setArm] = useState('');
  const [Hip, setHip] = useState('');

  const [image, setImage] = useState({});
  const navigate = useNavigation();

  const renderCustomerrNavbar = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title={`Add ${addTracker}`}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
        rightBtnPressSecond={() => {}}
        rightBtnPress={() => {}}
      />
    );
  }, [addTracker]);

  function getImage(img) {
    setImage(img);
  }

  const renderImagePicker = () => {
    return (
      <View>
        {image?.path ? (
          <View>
            <Image
              source={{uri: image.path}}
              resizeMode="cover"
              style={styles.imageView}
            />
            <TouchableOpacity
              onPress={() => setImage({})}
              style={styles.imgView}>
              <Image
                style={{width: 12, height: 12}}
                source={Images.crossImage}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleSelectImagePress(getImage)}
            style={styles.pickImage}>
            <Image source={Images.ImagePicker} />
            <Text
              style={{
                color: '#61D85E',
                fontSize: 12,
                marginTop: 6,
                fontWeight: '500',
                lineHeight: 18,
              }}>
              Upload Photo
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCustomerrNavbar}
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <KeyboardAwareScrollViewComponent
        // scrollEnabled={true}
        // containerStyle={styles.contentWrapper}
        >
          {renderImagePicker()}
          {addTracker == 'Weight' && (
            <TextInput
              leftIcon={Images.CurrentWeight}
              placeholder={'Weight'}
              value={Weight}
              onChangeText={setWeight}
              autoCapitalize="none"
              returnKeyType="next"
              placeholderTextColor={Colors.placeHolderColor}
              leftIconStyle={{height: 17, width: 18}}
              keyboardType="numeric"
              rightText={'lb'}
            />
          )}

          {addTracker == 'Body Fat' && (
            <TextInput
              placeholder={'Body Fat'}
              value={BodyFat}
              onChangeText={setBodyFat}
              autoCapitalize="none"
              returnKeyType="next"
              placeholderTextColor={Colors.placeHolderColor}
              leftIconStyle={{
                height: 23,
                width: 23,
                tintColor: Colors.black,
              }}
              keyboardType="numeric"
              leftIcon={Images.Fat}
              rightText={'%'}
            />
          )}
          {addTracker == 'BMI' && (
            <TextInput
              placeholder={'BMI'}
              value={BMI}
              onChangeText={setBMI}
              autoCapitalize="none"
              returnKeyType="next"
              placeholderTextColor={Colors.placeHolderColor}
              leftIconStyle={{
                height: 23,
                width: 23,
                tintColor: Colors.black,
              }}
              keyboardType="numeric"
              leftIcon={Images.BMI}
              rightText={'kg/m^2'}
            />
          )}
          {addTracker == 'Weist' && (
            <TextInput
              placeholder={'Weist'}
              value={Weist}
              onChangeText={setWeist}
              autoCapitalize="none"
              returnKeyType="next"
              placeholderTextColor={Colors.placeHolderColor}
              leftIconStyle={{
                height: 17,
                width: 16,
                tintColor: Colors.black,
              }}
              keyboardType="numeric"
              leftIcon={Images.Waist}
              rightText={'inch'}
            />
          )}
          {addTracker == 'Chest' && (
            <TextInput
              placeholder={'Chest'}
              value={Chest}
              onChangeText={setChest}
              autoCapitalize="none"
              returnKeyType="next"
              placeholderTextColor={Colors.placeHolderColor}
              leftIconStyle={{
                height: 16,
                width: 16,
                tintColor: Colors.black,
              }}
              keyboardType="numeric"
              leftIcon={Images.ChestCalf}
              rightText={'inch'}
            />
          )}
          {addTracker == 'Arm' && (
            <TextInput
              placeholder={'Arm '}
              value={Arm}
              onChangeText={setArm}
              autoCapitalize="none"
              returnKeyType="next"
              placeholderTextColor={Colors.placeHolderColor}
              leftIconStyle={{
                height: 17,
                width: 17,
                tintColor: Colors.black,
              }}
              keyboardType="numeric"
              leftIcon={Images.Arm}
              rightText={'inch'}
            />
          )}
          {addTracker == 'Hip' && (
            <TextInput
              placeholder={'Hip'}
              value={Hip}
              onChangeText={setHip}
              autoCapitalize="none"
              returnKeyType="next"
              placeholderTextColor={Colors.placeHolderColor}
              leftIconStyle={{
                height: 22,
                width: 17,
                tintColor: Colors.black,
              }}
              keyboardType="numeric"
              leftIcon={Images.Hip}
              rightText={'inch'}
            />
          )}
          <TouchableOpacity
            style={{
              height: 57,
              alignItems: 'center',
              paddingHorizontal: 20,
              borderRadius: 12,
              borderColor: '#E5E5E5',
              borderWidth: 1,
              marginTop: 10,
              flexDirection: 'row',
            }}
            onPress={() => setIsDateOpen(true)}>
            <Image
              style={{width: 20, height: 20}}
              source={Images.DatePickerIcon}
            />
            <Text
              size={12}
              color={date ? Colors.black : Colors.text.blueGray}
              style={{marginLeft: 10}}>
              {date ? moment(date).format('DD-MMM-YYYY') : 'Date'}
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollViewComponent>

        <Button
          title="Save"
          onPress={() => {
            navigate.goBack();
          }}
          style={styles.btnStyle}
        />
        {isDateOpen && (
          <DatePickerModal
            isDatePick={isDateOpen}
            isMaximumDate={true}
            setIsDatePick={setIsDateOpen}
            date={new Date()}
            setDate={setDate}
          />
        )}
      </View>
    </View>
  );
}
