import {createSlice} from '@reduxjs/toolkit';

const PaymentReducer = createSlice({
  name: 'payment',
  initialState: {
    paymentMethods: [],
    transactions: [],
  },
  reducers: {
    createPaymentMethodRequest() {},
    createPaymentMethodSuccess(state, action) {
      state.paymentMethods = [...state.paymentMethods, action?.payload];
    },

    getPaymentMethods(state, action) {
      state.paymentMethods = action?.payload?.payment_methods ?? [];
    },

    removePaymentMethodRequest() {},
    removePaymentMethodSuccess(state, action) {
      const allMethods = [...state.paymentMethods];

      state.paymentMethods = allMethods.filter(
        (item) => item?.id != action?.payload?.id,
      );
    },

    getAllTransactionsRequest() {},
    getAllTransactionsSuccess(state, action) {
      state.transactions = action.payload;
    },

    paymentLogoutUser(state) {
      state.paymentMethods = [];
      state.transactions = [];
    },
  },
});

export const {
  createPaymentMethodRequest,
  createPaymentMethodSuccess,
  getPaymentMethods,

  removePaymentMethodRequest,
  removePaymentMethodSuccess,

  getAllTransactionsRequest,
  getAllTransactionsSuccess,

  paymentLogoutUser,
} = PaymentReducer.actions;

export default PaymentReducer.reducer;
