import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {Colors, Fonts, Images} from '../../theme';
import Text from '../Text';
import styles from './styles';
import util from '../../util';
import DatePickerRN from 'react-native-date-picker';
import DatePickerModal from '../DatePickerModal';

export default function CarouselListDays(props) {
  const {date, setDate, clickOnDate} = props || {};
  const [isDatePick, setIsDatePick] = useState(false);

  const changeDateIncrease = () => {
    let newDate = new Date(date.setDate(date.getDate() + 1));
    setDate(newDate);
  };

  const changeDateDecrase = () => {
    let newDate = new Date(date.setDate(date.getDate() - 1));
    setDate(newDate);
  };

  const renderDays = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsDatePick(true);
        }}
        style={{width: '100%', alignItems: 'center'}}>
        <Text
          size={Fonts.size.xSmall}
          type={Fonts.type.bold}
          color={Colors.black}
          style={{fontWeight: '500'}}>
          {util.describeDate(date)}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPicker = useMemo(() => {
    return (
      <>
        {isDatePick && (
          <DatePickerModal
            isDatePick={isDatePick}
            setIsDatePick={setIsDatePick}
            date={date}
            setDate={setDate}
          />
        )}
      </>
    );
  }, [isDatePick]);

  return (
    <View style={[styles.mainView]}>
      <TouchableOpacity onPress={changeDateDecrase} style={styles.imgView}>
        <Image source={Images.LeftArrow} style={[styles.arrowImg]} />
      </TouchableOpacity>
      <View
        style={{
          width: '80%',
        }}>
        {renderDays()}
      </View>
      <TouchableOpacity
        onPress={changeDateIncrease}
        style={{
          width: 30,
          height: 30,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Image
          source={Images.LeftArrow}
          style={[{width: 11, height: 18, transform: [{rotate: '180deg'}]}]}
        />
      </TouchableOpacity>
      {renderPicker}
    </View>
  );
}
