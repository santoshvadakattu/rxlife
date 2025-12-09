import {View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import Text from '../Text';
import styles from './styles';
import ProgramDayNoteModal from '../ProgramDayNoteModal';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';

export default function ProgramDayVideoItem({
  text,
  maxLength,
  showMoreText = 'Read More',
  showLessText = 'Show Less',
}) {
  const [isTruncated, setIsTruncated] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigation();

  const ReadMore = () => {
    return (
      <Text
        size={12}
        type={Fonts.type.base}
        color={Colors.black}
        style={{fontWeight: '700'}}
        onPress={() => setIsTruncated(!isTruncated)}>
        {isTruncated ? 'Read more' : ' Read less'}
      </Text>
    );
  };

  return (
    <View style={styles.mainView}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigate.navigate(SCREENS.HOME.videoScreen, {
                  videoUrl: '',
                });
              }}>
              <Image
                style={{
                  width: 24,
                  height: 24,
                  tintColor: Colors.background.primary,
                }}
                source={Images.Video}
              />
            </TouchableOpacity>
            <View style={{marginLeft: 10}}>
              <Text
                size={16}
                type={Fonts.type.base}
                style={{fontWeight: '600'}}>
                Star Crawl
              </Text>
              <Text
                size={14}
                type={Fonts.type.base}
                style={{fontWeight: '400'}}>
                00:30
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              alignItems: 'flex-end',
              marginRight: 4,
            }}
            onPress={() => setIsVisible(true)}>
            <Image source={Images.NoteBookIcon} />
          </TouchableOpacity>
        </View>
        <View
          style={{marginTop: 10, flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text
            size={14}
            type={Fonts.type.base}
            style={{fontWeight: '400', flex: 1, lineHeight: 18}}
            numberOfLines={isTruncated ? 4 : Number.MAX_SAFE_INTEGER}>
            {text}
            {!isTruncated && <ReadMore />}
          </Text>
        </View>
        {isTruncated && <ReadMore />}
      </View>

      <TouchableOpacity
        style={{
          height: 28,
          marginTop: 10,
          backgroundColor: 'rgba(97, 216, 94, 0.2)',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
        }}>
        <Image
          style={{width: 14, height: 14, tintColor: '#61D85E', marginRight: 5}}
          source={Images.Check}
        />
        <Text size={10} type={Fonts.type.base} style={{fontweight: '400'}}>
          Mark as Complete
        </Text>
      </TouchableOpacity>
      {isVisible && (
        <ProgramDayNoteModal isVisible={isVisible} setVisible={setIsVisible} />
      )}
    </View>
  );
}
