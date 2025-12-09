import {Image, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useCallback, useEffect, useState} from 'react';

import styles from './styles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import Text from '../Text';
import ButtonView from '../ButtonView';

const GoalCheckItem = (props) => {
  const {
    title = '',
    containerStyle = {},
    isChecked = false,
    itemId,
    selectedDate = '',
    // functions
    handleToggleCheck,
    disabled = false,
  } = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(isChecked);
  useEffect(() => {
    setToggleCheckBox(isChecked);
  }, [selectedDate]);

  const handleChange = () => {
    handleToggleCheck(!isChecked, itemId);
  };

  const renderCheckbox = () => {
    return (
      <ButtonView
        style={{
          borderWidth: 1,
          borderColor: isChecked
            ? Colors.background.primary
            : Colors.text.primary,
          backgroundColor: isChecked ? Colors.background.primary : Colors.white,
          height: 24,
          width: 24,
          borderRadius: 3,
          ...AppStyles.centerInner,
        }}
        onPress={handleChange}
        disabled={disabled}>
        {isChecked && (
          <Image
            source={Images.Check}
            style={{tintColor: Colors.white, height: 9, width: 12}}
          />
        )}
      </ButtonView>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* <CheckBox
        disabled={disabled}
        boxType="square"
        lineWidth={1}
        onCheckColor={Colors.white}
        onFillColor={Colors.background.primary}
        onTintColor={Colors.background.primary}
        tintColors={{true: Colors.background.primary, false: '#d4d4d4'}}
        onAnimationType="fill"
        offAnimationType="fill"
        value={toggleCheckBox}
        hideBox={false}
        onValueChange={handleChange}
        // onValueChange={(newValue) => {
        //   // setToggleCheckBox(newValue);
        //   handleToggleCheck(newValue, itemId);
        // }}
        style={styles.checkBox}
      /> */}
      {renderCheckbox()}

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        size={Fonts.size.xSmall}
        type={Fonts.type.base}
        style={styles.text}>
        {title}
      </Text>
    </View>
  );
};

export default GoalCheckItem;
