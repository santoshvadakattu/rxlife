import {ScrollView, View} from 'react-native';
import React from 'react';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {DisplayBottom} from '../../Partials';
import styles from './styles';
import {
  Button,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  Text,
  TextInput,
} from '../../components';

import {CardField, useStripe} from '@stripe/stripe-react-native';

const AddPaymentMethodUI = (props) => {
  const {
    navigate,
    cardNumber,
    cvv,
    expiryDate,
    zipCode,
    cardNumberError,
    cvvError,
    expiryDateError,
    zipCodeError,
    isLoading,
    stripeCardDetail,
    stripeCardError,
    // REFS
    cardNumberRef,
    cvvRef,
    expiryDateRef,
    zipCodeRef,
    // functions
    handleChangeNumber,
    handleAddExpiryDate,
    handleChangeCvv,
    handleChangeZipCode,
    handleSubmit,
    handleStripeCard,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title="Add New Card"
        hasBorder={false}
        titleColor={Colors.black}
        hasBack
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
      />

      <KeyboardAwareScrollViewComponent containerStyle={styles.wrapper}>
        {/* <Text size={Fonts.size.medium} type="semiBold">
          Add Card
        </Text> */}

        {/* <TextInput
          leftIcon={Images.Card}
          placeholder={'Card Number'}
          value={cardNumber}
          onChangeText={handleChangeNumber}
          maxLength={19}
          onSubmitEditing={() => expiryDateRef?.current?.focus?.()}
          ref={cardNumberRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={cardNumberError}
          leftIconStyle={{height: 17, width: 21}}
          keyboardType="numeric"
        />

        <TextInput
          leftIcon={Images.DatePickerIcon}
          placeholder={'Expiry Date'}
          value={expiryDate}
          onChangeText={handleAddExpiryDate}
          maxLength={5}
          onSubmitEditing={() => cvv?.current?.focus?.()}
          ref={expiryDateRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={expiryDateError}
          leftIconStyle={{height: 18, width: 18}}
          keyboardType="numeric"
        />

        <View style={styles.row2}>
          <TextInput
            leftIcon={Images.PasswordIcon}
            placeholder={'CVV'}
            value={cvv}
            onChangeText={handleChangeCvv}
            maxLength={3}
            onSubmitEditing={() => zipCodeRef?.current?.focus?.()}
            ref={cvvRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={cvvError}
            leftIconStyle={{height: 18, width: 18}}
            containerStyle={AppStyles.mRight5}
            keyboardType="numeric"
          />

          <TextInput
            leftIcon={Images.PasswordIcon}
            placeholder={'Zip Code'}
            value={zipCode}
            onChangeText={handleChangeZipCode}
            maxLength={5}
            // onSubmitEditing={() => emailRef?.current?.focus?.()}
            ref={zipCodeRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={zipCodeError}
            containerStyle={AppStyles.mLeft5}
            leftIconStyle={{height: 18, width: 18}}
            keyboardType="numeric"
          />
        </View> */}

        <CardField
          postalCodeEnabled={true}
          autofocus
          placeholders={{
            number: 'Card Number',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            fontFamily: Fonts.type.base,
            textColor: Colors.grey5,
            fontSize: Fonts.size.xSmall,
            borderColor: '#3737371a',
            // borderColor: Colors.grey4,
            borderWidth: 1,
            borderRadius: 12,
            placeholderColor: '#3737371a',
          }}
          style={{
            width: '100%',
            height: 70,
            marginTop: 3,
            fontFamily: Fonts.type.base,
            color: Colors.grey5,
            fontSize: Fonts.size.xSmall,
            paddingLeft: 50,
            position: 'relative',
            paddingRight: 20,
            paddingVertical: 18,
            backgroundColor: 'transparent',
            placeholderColor: '#37373733',
          }}
          placeholder={Colors.placeHolderColor}
          onCardChange={(cardDetails) => {
            handleStripeCard(cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />

        {stripeCardError && (
          <Text
            type="medium"
            size="xxxSmall"
            color={Colors.red}
            style={[AppStyles.mTop5, AppStyles.mBottom5]}>
            {stripeCardError}
          </Text>
        )}
      </KeyboardAwareScrollViewComponent>

      <DisplayBottom>
        <Button
          title="ADD"
          // onPress={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading}
          onPress={handleSubmit}
        />
      </DisplayBottom>
    </View>
  );
};

export default AddPaymentMethodUI;
