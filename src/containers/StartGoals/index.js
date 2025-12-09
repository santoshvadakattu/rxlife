import {View, Image} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import styles from './styles';
import {Button, CustomNavbar, Text} from '../../components';
import {Colors, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';
import {setGoalFromSignUp} from '../../redux/slicers/general';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDataRequest} from '../../redux/slicers/user';

export default function StartGoals() {
  const {userData} = useSelector((state) => state.user);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      userId: userData.id,
    };
    dispatch(
      getUserDataRequest({
        payloadData: payload,
        responseCallback: () => {},
      }),
    );
  }, []);

  const renderHeader = useMemo(() => {
    return (
      <View>
        <CustomNavbar
          hasBorder={false}
          title={'Goals'}
          titleColor={Colors.black}
        />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      {renderHeader}
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={Images.goalsEmptyImage} />
        <Text
          size={20}
          color={Colors.black}
          style={{marginTop: 10, lineHeight: 21, fontWeight: '600'}}>
          Let’s start with goals
        </Text>
      </View>

      <Button
        title="Let’s Set"
        onPress={() => {
          dispatch(setGoalFromSignUp(false));
          navigate.navigate(SCREENS.GOALS.setGoals);
        }}
        style={[styles.btnStyle, {}]}
      />
    </View>
  );
}
