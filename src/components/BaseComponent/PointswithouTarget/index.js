import {Image, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Colors, Fonts, Images} from '../../../theme';
import Text from '../../Text';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useNavigation} from '@react-navigation/native';

export default function PointswithouTarget(props) {
  const {targetPoint, earnPoint, isActive} = props;
  const progressRef = useRef();
  const navigate = useNavigation();
  const [firstTime, setFirstTime] = useState(true);

  useMemo(() => {
    if (!firstTime) {
      if (progressRef?.current) {
        // progressRef?.current?.reAnimate();
      }
    }
  }, [targetPoint, earnPoint]);

  useEffect(() => {
    setFirstTime(false);
  }, []);

  const value =
    earnPoint > 0 ? (targetPoint > 0 ? (earnPoint / targetPoint) * 60 : 0) : 0;
  return (
    <TouchableOpacity
      onPress={() => isActive && navigate.navigate('activityWeeklyPoint')}
      style={{
        padding: 15,
        width: '100%',
        height: 210,
        borderRadius: 12,
        backgroundColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.5,
        elevation: 2,
        marginTop: 20,
        paddingVertical: 10,
      }}>
      <View>
        <Text
          color={Colors.black2}
          type={Fonts.type.base}
          size={Fonts.size.normal}
          style={{fontWeight: '600'}}>
          Points
        </Text>
        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            color={Colors.black}
            type={Fonts.type.base}
            size={10}
            style={{fontWeight: '400'}}>
            Target : {isActive ? targetPoint : '--'} pts
          </Text>
          <CircularProgress
            value={value}
            radius={60}
            ref={progressRef}
            maxValue={60}
            initialValue={0}
            activeStrokeWidth={15}
            inActiveStrokeWidth={15}
            duration={5000}
            clockwise={true}
            progressValueColor={Colors.text.primary}
            progressValueFontSize={1}
            activeStrokeColor={'#61D85E'}
            inActiveStrokeColor={'#def7df'}
          />
          <Text
            color={Colors.black}
            type={Fonts.type.base}
            size={10}
            style={{fontWeight: '400'}}>
            Earn : {isActive ? earnPoint : '--'} pts{' '}
          </Text>
        </View>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Images.unFillStart}
            style={[
              {
                width: 17,
                height: 17,
                resizeMode: 'contain',
                marginRight: 5,
              },
              !isActive && {tintColor: Colors.disable},
            ]}
          />
          <Text
            color={isActive ? Colors.black2 : Colors.disable}
            type={Fonts.type.base}
            size={Fonts.size.xxxSmall}
            style={{fontWeight: '500'}}>
            Winning Points
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
