import {View, ScrollView, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import {
  Button,
  ButtonView,
  ChallengeBox,
  CustomNavbar,
  ModalCancel,
  Text,
} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import style from './style';
import {DisplayBottom} from '../../Partials';

const CheckoutUI = (props) => {
  const {
    challengeData,
    isCardAdded,
    isLoading,
    paymentMethods,
    selectedMethod,
    isDeleteModalShow,
    methodDeleteLoading,
    // functions
    navigate,
    removeCard,
    handleAddMethod,
    handleSubmit,
    setIsDeleteModalShow,
    setSelectedMethod,
  } = props;

  const renderCardSection = () => {
    return (
      <>
        {paymentMethods?.length > 0 ? (
          <>
            {paymentMethods?.map((item) => (
              <View style={style.cardInfo} key={item?.id}>
                <View style={style.cardInfoImageBG}>
                  <Image source={Images.Visa} style={style.cardInfoImage} />
                </View>

                <Text
                  type="medium"
                  size={Fonts?.size.xSmall}
                  color={Colors.white}
                  style={{textTransform: 'capitalize'}}>
                  {item?.brand}
                </Text>

                {methodDeleteLoading && selectedMethod?.id == item?.id ? (
                  <ActivityIndicator
                    style={style.cancelBtn}
                    size={'small'}
                    color={Colors.white}
                  />
                ) : (
                  <ButtonView
                    style={style.cancelBtn}
                    onPress={() => {
                      setIsDeleteModalShow(true);
                      setSelectedMethod(item);
                    }}>
                    <Image
                      source={Images.Trash}
                      style={{height: 22, width: 21}}
                    />
                  </ButtonView>
                )}
              </View>
            ))}
          </>
        ) : (
          <ButtonView style={style.addPaymentBtn} onPress={handleAddMethod}>
            <Text
              size={Fonts.size.small}
              color={Colors.text.theme}
              type="medium">
              Add Card Details
            </Text>
          </ButtonView>
        )}
      </>
    );
  };

  return (
    <View style={style.container}>
      <CustomNavbar
        title="Payment Method"
        hasBorder={false}
        titleColor={Colors.black}
        hasBack
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
      />

      <ScrollView style={style.wrapper}>
        <ChallengeBox data={challengeData} />

        {renderCardSection()}
      </ScrollView>

      <DisplayBottom>
        <Button
          title="PAY NOW"
          isLoading={isLoading}
          diabled={isLoading}
          onPress={handleSubmit}
        />
      </DisplayBottom>
      <ModalCancel
        title="Are you sure you want to remove the card?"
        isVisible={isDeleteModalShow}
        setVisible={setIsDeleteModalShow}
        setIsActive={removeCard}
        actionTitle={'Remove'}
      />
    </View>
  );
};

export default CheckoutUI;
