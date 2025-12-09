import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Text from '../Text';
import styles from './styles';
import {Colors, Images} from '../../theme';
import SeperaterView from '../SeperaterView';
import util from '../../util';
import Button from '../Button';
import ButtonView from '../ButtonView';

export default function NutritionDropDown(props) {
  const {dropArray, selectedValueFunc, placeHolder} = props || {};
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <>
      <ButtonView onPress={() => setIsOpen(!isOpen)} style={styles.viewStyle}>
        <Text
          size={14}
          type="base"
          color={
            util.isEmptyValue(selectedValue)
              ? Colors.text.blueGray
              : Colors.black
          }>
          {util.isEmptyValue(selectedValue) ? placeHolder : selectedValue}
        </Text>
        <TouchableOpacity
          onPress={() => setIsOpen(!isOpen)}
          style={styles.dropDownImage}>
          <Image resizeMode="cover" source={Images.dropDrop} />
        </TouchableOpacity>
      </ButtonView>
      {isOpen && (
        <View style={styles.dropDownView}>
          <FlatList
            data={dropArray}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{backgroundColor: 'white', flexGrow: 1}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedValue(item);
                    setIsOpen(false);
                    selectedValueFunc(item);
                  }}>
                  <Text
                    size={14}
                    type="base"
                    color="#36405B"
                    style={{marginTop: 15, fontWeight: '500'}}>
                    {item}
                  </Text>
                  {index + 1 != dropArray.length && <SeperaterView />}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </>
  );
}
