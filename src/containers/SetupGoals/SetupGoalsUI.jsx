import {ActivityIndicator, FlatList, View} from 'react-native';
import React from 'react';
import {
  Button,
  CustomNavbar,
  GoalCheckItem,
  KeyboardAwareScrollViewComponent,
} from '../../components';
import styles from './styles';
import {AppStyles, Colors, Images} from '../../theme';
import {loginUserRequest} from '../../redux/slicers/user';

const SetupGoalsUI = (props) => {
  const {
    //  hooks
    navigate,

    // states
    allItems,
    isLoadingData,
    isLoading,
    // refs

    // functions
    handleToggleCheck,
    handleSubmit,
    skipBtnOnpress,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Tell us your goals'}
        titleColor={Colors.black}
        hasBack={true}
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
        rightBtnPress={skipBtnOnpress}
        rightBtnText={'Skip'}
      />

      <KeyboardAwareScrollViewComponent
        scrollEnabled={true}
        style={{flex: 1}}
        containerStyle={styles.contentWrapper}>
        {isLoadingData ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <FlatList
            data={allItems}
            style={AppStyles.pTop20}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
            renderItem={({item}) => {
              return (
                <GoalCheckItem
                  title={item?.attributes?.title}
                  itemId={item?.id}
                  handleToggleCheck={handleToggleCheck}
                  isChecked={item.isChecked}
                />
              );
            }}
          />
        )}
      </KeyboardAwareScrollViewComponent>
      <View style={{marginBottom: 30, backgroundColor: Colors.white}}>
        <Button
          indicatorColor={'white'}
          isLoading={isLoading}
          title="next"
          onPress={handleSubmit}
          disabled={isLoadingData}
          style={{marginTop: 0}}
        />
      </View>
    </View>
  );
};

export default SetupGoalsUI;
