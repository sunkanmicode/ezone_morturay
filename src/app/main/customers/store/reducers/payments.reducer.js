import * as Actions from '../actions';

const initialState = {
  loading: false,
  paymentData: null,
  error: null,
  paymentDialog: {
    open: false,
    data: null
  },
};

const paymentsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.PAY_FOR_INVOICE: {
      return {
        ...state,
        loading: false,
        paymentData: action.payload,
      };
    }
    case Actions.OPEN_INVOICE_PAYMENT_DIALOG: {
      return {
        ...state,
        paymentDialog: {
          open: true,
          data: action.payload
        },
      };
    }
    case Actions.CLOSE_INVOICE_PAYMENT_DIALOG: {
      return {
        ...state,
        paymentDialog: {
          open: false,
          data: null
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default paymentsReducer;
