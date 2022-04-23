import * as Actions from '../actions';

const initialState = {
  loading: false,
  discounts: [],
  message: null,
};

const discountsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_DISCOUNTS: {
      return {
        ...state,
        discounts: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default discountsReducer;
