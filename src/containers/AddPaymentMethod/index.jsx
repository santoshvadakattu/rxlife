import React, {useRef, useState} from 'react';
import AddPaymentMethodUI from './AddPaymentMethodUI';
import {useNavigation} from '@react-navigation/native';
import util from '../../util';
import {STRIPE_PUBLISH_KEY, strings} from '../../constants';
import {useDispatch} from 'react-redux';
import {setCardDetail} from '../../redux/slicers/user';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {createPaymentMethodRequest} from '../../redux/slicers/payment';
import {ERROR_SOMETHING_WENT_WRONG} from '../../config/WebService';

const AddPaymentMethod = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const {createPaymentMethod} = useStripe();

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');
  const [stripeCardError, setStripeCardError] = useState('');

  const [stripeCardDetail, setStripeCardDetail] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const cardNumberRef = useRef();
  const expiryDateRef = useRef();
  const cvvRef = useRef();
  const zipCodeRef = useRef();

  const handleChangeNumber = (text) => {
    const number = util.formatCardNumber(text);

    setCardNumber(number);
    setCardNumberError('');
  };

  const handleAddExpiryDate = (text) => {
    const numericInput = text.replace(/\D/g, '').slice(0, 4);

    // Add a slash between the first two characters
    const formattedInput = numericInput.replace(/(\d{2})(?=\d)/g, '$1/');

    setExpiryDate(formattedInput);
    setExpiryDateError('');
  };

  const handleChangeCvv = (text) => {
    setCvv(text);
    setCvvError('');
  };

  const handleChangeZipCode = (text) => {
    setZipCode(text);
    setZipCodeError('');
  };

  const handleStripeCard = (detail) => {
    setStripeCardDetail(detail);

    stripeCardError && setStripeCardError('');
  };

  const _validate = () => {
    let isValid = true;

    if (util.isEmptyValueWithoutTrim(cardNumber)) {
      setCardNumberError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(cardNumber)) {
      setCardNumberError(strings.NAME_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    } else if (cardNumber?.length < 19 || cardNumber?.length > 19) {
      setCardNumberError('Invalid value');
      isValid = false;
    }

    if (!validateExpiryDate()) {
      isValid = false;
    }

    if (util.isEmptyValueWithoutTrim(cvv)) {
      setCvvError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(cvv)) {
      setCvvError(strings.NAME_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    } else if (cvv?.length < 3 || cvv?.length > 3) {
      setCvvError('Invalid value');
      isValid = false;
    }

    if (util.isEmptyValueWithoutTrim(zipCode)) {
      setZipCodeError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(zipCode)) {
      setZipCodeError(strings.NAME_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    } else if (zipCode?.length < 5 || zipCode?.length > 5) {
      setZipCodeError('Invalid value');
      isValid = false;
    }

    return isValid;
  };

  const validateExpiryDate = () => {
    if (util?.isEmptyValueWithoutTrim(expiryDate)) {
      setExpiryDateError(strings.REQUIRED_FIELD);
      return false;
    }

    // Check if the expiry date is in MM/YY format
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setExpiryDateError('Invalid Expiry Date');
      return false;
    }

    const [month, year] = expiryDate.split('/');
    const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year

    if (
      !(
        parseInt(month, 10) >= 1 &&
        parseInt(month, 10) <= 12 &&
        parseInt(year, 10) >= currentYear
      )
    ) {
      setExpiryDateError('Invalid Expiry Date');
      return false;
    }

    return true;
    // Check if the month is valid (01-12) and the year is in the future or the current year
  };

  const handleSubmit = async () => {
    console.log('handleSubmit');
    try {
      setIsLoading(true);
      const res = await createPaymentMethod({
        paymentMethodType: 'Card',
        paymentMethodData: stripeCardDetail,
      });
      console.log({res});

      if (res?.error?.message) {
        setStripeCardError(res?.error?.message);
        setIsLoading(false);
        return;
      }
      navigate.goBack();
      const paymentMethodId = res.paymentMethod?.id;
      /// TODO
      // dispatch(
      //   createPaymentMethodRequest({
      //     payloadData: {
      //       paymentMethodId: paymentMethodId,
      //     },
      //     responseCallback: (status) => {
      //       setIsLoading(false);
      //       if (status) {
      //         util.topAlert('Card added successfully');
      //         navigate.goBack();
      //       }
      //     },
      //   }),
      // );
    } catch (error) {
      setIsLoading(false);
      util.topAlertError(ERROR_SOMETHING_WENT_WRONG.error);
      console.error('stripe error', error);
    }
  };

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISH_KEY.publishKey}>
      <AddPaymentMethodUI
        navigate={navigate}
        cardNumber={cardNumber}
        cvv={cvv}
        expiryDate={expiryDate}
        zipCode={zipCode}
        cardNumberError={cardNumberError}
        cvvError={cvvError}
        expiryDateError={expiryDateError}
        zipCodeError={zipCodeError}
        isLoading={isLoading}
        stripeCardDetail={stripeCardDetail}
        stripeCardError={stripeCardError}
        // REFS
        cardNumberRef={cardNumberRef}
        cvvRef={cvvRef}
        expiryDateRef={expiryDateRef}
        zipCodeRef={zipCodeRef}
        // functions
        handleChangeNumber={handleChangeNumber}
        handleAddExpiryDate={handleAddExpiryDate}
        handleChangeCvv={handleChangeCvv}
        handleChangeZipCode={handleChangeZipCode}
        handleSubmit={handleSubmit}
        handleStripeCard={handleStripeCard}
      />
    </StripeProvider>
  );
};

export default AddPaymentMethod;
