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

export default function CarouselListArrow(props) {
  const {
    data,
    refFlatlist,
    clickOnLeft,
    setCurrentIndex,
    clickOnRight,
    styleView,
  } = props || {};
  const [flatWidth, setFlatWidth] = useState('');
  const [stateIndex, setStateIndex] = useState(() => 0);

  const memoizedData = useMemo(() => data, [data]);

  const originalRenderItem = ({item}) => {
    return (
      <View
        style={{
          width: flatWidth - 5,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 3,
        }}>
        <Text
          color={Colors.black2}
          type={Fonts.type.base}
          size={14}
          style={{fontWeight: '500'}}>
          {item?.title}
        </Text>
        <Text
          color={Colors.black2}
          type={Fonts.type.base}
          size={10}
          style={{fontWeight: '500', textTransform: 'capitalize'}}>
          {item?.text} {item?.des}
        </Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => originalRenderItem({item, index});

  return (
    <View style={[styles.mainView, styleView]}>
      <TouchableOpacity
        disabled={stateIndex == 0 ? true : false}
        onPress={() => clickOnRight(stateIndex)}
        style={styles.imgView}>
        <Image
          source={Images.LeftArrow}
          style={[
            styles.arrowImg,
            stateIndex == 0 && {tintColor: Colors.text.Gray62},
          ]}
        />
      </TouchableOpacity>
      <View
        onLayout={(event) => {
          setFlatWidth(event.nativeEvent.layout.width);
        }}
        style={{
          width: '80%',
        }}>
        <FlatList
          horizontal
          ref={refFlatlist}
          showsHorizontalScrollIndicator={false}
          data={memoizedData}
          pagingEnabled={true}
          bounces={false}
          onScrollToIndexFailed={() => {}}
          onScroll={(event) => {
            const offset = event.nativeEvent.contentOffset.x;
            // const width = flatWidth - 5;
            const width = event.nativeEvent.layoutMeasurement.width;
            const index = Math.floor(offset / width);

            setStateIndex(index);
            setCurrentIndex(index);
          }}
          renderItem={(props) => renderItem(props)}
          decelerationRate={'fast'}
          snapToAlignment="center"
          style={{flex: 1}}
          initialNumToRender={memoizedData?.length}
        />
      </View>
      <TouchableOpacity
        onPress={() => clickOnLeft(stateIndex)}
        disabled={data.lenght - 1 == stateIndex ? true : false}
        style={{
          width: 30,
          height: 30,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Image
          source={Images.LeftArrow}
          style={[
            {width: 11, height: 18, transform: [{rotate: '180deg'}]},
            data.length - 1 == stateIndex && {tintColor: Colors.text.Gray62},
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}
