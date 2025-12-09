import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  ButtonView,
  CustomNavbar,
  EmptyList,
  ModalCancel,
  Text,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SCREENS, TRANSACTIONS} from '../../constants';
import {setCardDetail} from '../../redux/slicers/user';
import {
  getAllTransactionsRequest,
  removePaymentMethodRequest,
} from '../../redux/slicers/payment';

const Transactions = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isCardAdded = useSelector((state) => state?.user?.isCardAdded);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [transactionLoading, setTransactionLoading] = useState(true);

  const {paymentMethods, transactions} = useSelector((state) => state?.payment);
  const {userData} = useSelector((state) => state?.user);

  useEffect(() => {
    if (isFocused) {
      dispatch(
        getAllTransactionsRequest({
          payloadData: {
            query: `filters[user][id][$eq]=${userData?.id}&populate=challenge.title&populate=challenge.price&pagination[page]=1&pagination[pageSize]=500000&sort[0]=createdAt:desc`,
          },
          responseCallback: () => {
            setTransactionLoading(false);
          },
        }),
      );
    }
  }, [isFocused]);

  const handleAddMethod = () => {
    navigate.navigate(SCREENS.HOME.paymentMethodSetting);
  };

  const removeCard = () => {
    // dispatch(setCardDetail(false));
    setIsLoading(true);
    dispatch(
      removePaymentMethodRequest({
        payloadData: {
          paymentMethodId: selectedMethod?.id,
        },
        responseCallback: (status) => {
          setSelectedMethod(false);
          setIsLoading(false);
        },
      }),
    );
  };

  const renderCardSection = () => {
    return (
      <>
        {paymentMethods?.length > 0 ? (
          <>
            {paymentMethods?.map((method) => (
              <View style={styles.cardInfo} key={method?.id}>
                <View style={styles.cardInfoImageBG}>
                  <Image source={Images.Visa} style={styles.cardInfoImage} />
                </View>

                <Text
                  type="medium"
                  size={Fonts?.size.xSmall}
                  color={Colors.white}
                  style={{textTransform: 'capitalize'}}>
                  {method?.brand} Card
                </Text>

                {isLoading && selectedMethod?.id == method?.id ? (
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
                      setSelectedMethod(method);
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
          <ButtonView style={styles.addPaymentBtn} onPress={handleAddMethod}>
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

  const renderItem = (data, index) => {
    return (
      <View
        style={[
          styles.transaction,
          index + 1 === TRANSACTIONS.length && {borderBottomWidth: 0},
        ]}>
        <View style={[AppStyles.mTop5, styles.space]}>
          <Text size={Fonts.size.xxxSmall} type="medium">
            Challenge Name
          </Text>
          <Text size={Fonts.size.xxxSmall} style={styles.opacity}>
            {data?.challengeName}
          </Text>
        </View>

        <View style={[AppStyles.mTop5, styles.space]}>
          <Text size={Fonts.size.xxxSmall} type="medium">
            Transaction ID
          </Text>
          <Text size={Fonts.size.xxxSmall} style={styles.opacity}>
            {data?.transactionId}
          </Text>
        </View>

        <View style={[AppStyles.mTop5, styles.space]}>
          <Text size={Fonts.size.xxxSmall} type="medium">
            Amount
          </Text>
          <Text size={Fonts.size.xxxSmall} style={styles.opacity}>
            ${data?.amount}.00
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.containner}>
      <CustomNavbar
        hasBorder={false}
        title={'Payment Method'}
        titleColor={Colors.black}
        hasBack={true}
        leftBtnPress={() => navigate.goBack()}
        leftBtnImage={Images.BackIcon}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
        {renderCardSection()}

        <View style={[styles.transactionWrapper, AppStyles.themeShadow]}>
          <Text size={16} type={'bold'}>
            Transaction History
          </Text>
          {transactionLoading ? (
            <ActivityIndicator
              color={Colors.background.primary}
              style={[AppStyles.mTop10, AppStyles.mBottom10]}
              size={'small'}
            />
          ) : (
            <FlatList
              data={transactions}
              renderItem={({item, index}) => renderItem(item, index)}
              keyExtractor={(item) => String(item?.id)}
              ListEmptyComponent={EmptyList}
              style={[
                AppStyles.flex,
                transactions?.length == 0 && AppStyles.padding20,
              ]}
            />
          )}
        </View>
      </ScrollView>
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

export default Transactions;
