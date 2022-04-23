import * as Actions from '../actions';

const initialState = {
  loading: false,
  paymentAdvice: null,
  error: null
};

const invoicesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_PAYMENT_ADVICE: {
      return {
        ...state,
        paymentAdvice: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default invoicesReducer;
