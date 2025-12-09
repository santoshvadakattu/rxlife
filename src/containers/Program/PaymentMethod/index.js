import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  ButtonView,
  CustomNavbar,
  EmptyList,
  ModalCancel,
  ProgramDayItem,
  ProgramsItem,
  Text,
} from '../../../components';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {SCREENS, TRANSACTIONS} from '../../../constants';
import {useSelector} from 'react-redux';

export default function PaymentMethod() {
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(true);
  const [methodDeleteLoading, setMethodDeleteLoading] = useState(false);

  const {paymentMethods} = useSelector((state) => state?.payment);

  const navigate = useNavigation();

  const removeCard = () => {
    setIsLoading(true);
  };

  const renderCardSection = () => {
    return (
      <>
        {paymentMethods?.length > 0 ? (
          <>
            {paymentMethods?.map((item) => (
              <View style={styles.cardInfo} key={item?.id}>
                <View style={styles.cardInfoImageBG}>
                  <Image source={Images.Visa} style={styles.cardInfoImage} />
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
                    style={styles.cancelBtn}
                    size={'small'}
                    color={Colors.white}
                  />
                ) : (
                  <ButtonView
                    style={styles.cancelBtn}
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
          <ButtonView
            style={styles.addPaymentBtn}
            onPress={() => {
              navigate.navigate(SCREENS.PROGRAMS.addPaymentMethod);
            }}>
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

  const renderAddPayment = () => {
    return (
      <View style={styles.addPaymentBtn}>
        <Text
          size={14}
          type={Fonts.type.base}
          color={Colors.background.primary}
          style={{fontWeight: '600'}}>
          Add Payment Structure
        </Text>
      </View>
    );
  };

  const renderBtn = () => {
    return (
      <Button
        onPress={() => {
          navigate.goBack();
        }}
        title={'Pay now'}
        style={styles.btnStyle}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Payment Method'}
        titleColor={Colors.black}
        hasBack={true}
        leftBtnPress={() => navigate.goBack()}
        leftBtnImage={Images.BackIcon}
      />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={styles.wrapper}>
          <ProgramsItem />
          {renderCardSection()}
        </View>
        {renderBtn()}
      </View>
      <ModalCancel
        title="Are you sure you want to remove the card?"
        isVisible={isDeleteModalShow}
        setVisible={setIsDeleteModalShow}
        setIsActive={removeCard}
        actionTitle={'Remove'}
      />
    </View>
  );
}
