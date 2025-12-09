import {View, Text, FlatList, ImageBackground, Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import {Images} from '../../theme';
import styles from './styles';
import WalkthoughBottom from '../../components/WalkThoughBottom';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setFirstTime} from '../../redux/slicers/general';

const ITEMS = [
  {
    image: Images.FirstWalkThrough,
    key: 1,
    text1: 'Build Healthy',
    text2: 'Against Peers',
    text3: 'and win prizes',
  },
  {
    image: Images.SecondWalkThrough,
    key: 2,
    text1: 'Track points',
    text2: 'and workout',
    text3: 'data',
  },
  {
    image: Images.ThirdWalkThrough,
    key: 3,
    text1: 'Compete',
    text2: 'against peers',
    text3: 'and win prizes',
  },
];

const WalkThrough = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const _handleNext = (index) => {
    if (index == 2) {
      dispatch(setFirstTime(false));
      navigate.navigate('login');
    } else {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: index + 1,
      });
    }
  };

  const renderViewGoalText = (index) => {
    const data = ITEMS[index ?? 0];
    return (
      <View style={styles.goalView}>
        <Text style={styles.goalText}> {data?.text1} </Text>
        <Text style={styles.goalText}> {data?.text2} </Text>
        <Text style={styles.goalText}> {data?.text3} </Text>
      </View>
    );
  };

  const itemIndex = activeIndex < 200 ? 0 : activeIndex < 400 ? 1 : 2;

  return (
    <View style={styles.container}>
      <FlatList
        data={ITEMS}
        horizontal
        ref={flatListRef}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={(item) => String(item?.key)}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={0}
        onScroll={(onScroll) => {
          const offset = onScroll.nativeEvent.contentOffset.x;
          const index = Math.round(offset / Dimensions.get('screen').width);

          setActiveIndex(index);
        }}
        pagingEnabled
        renderItem={({item, index}) => {
          return (
            <ImageBackground
              source={item.image}
              style={[
                styles.imageContainer,
                {width: Dimensions.get('screen').width},
              ]}>
              <View style={styles.goalContainer}>
                {renderViewGoalText(index)}

                <WalkthoughBottom
                  step={activeIndex + 1}
                  onPress={() => {
                    _handleNext(activeIndex);
                  }}
                />
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};

export default WalkThrough;
