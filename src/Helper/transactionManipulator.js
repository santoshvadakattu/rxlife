import _ from 'lodash';

export function allTransactionsManipulator(list) {
  try {
    if (_.isEmpty(list)) return [];

    const payload = [];

    for (let item of list) {
      const data = {};
      const transaction = item?.attributes;

      data.challengeName =
        transaction?.challenge?.data?.attributes?.title ??
        transaction?.challenge_name;
      data.amount =
        transaction?.challenge?.data?.attributes?.price ?? transaction?.amount;
      data.id = item?.id ?? '';
      data.transactionId = transaction?.transaction_id ?? '';

      payload.push(data);
    }
    return payload;
  } catch (error) {
    console.error('allTransactionsManipulator error --->>>>>', error);
    return [];
  }
}
