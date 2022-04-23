import * as Actions from '../actions';

const initialState = {
  loading: false,
  banks: [],
  message: null,
};

const banksReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_BANKS: {
      return {
        ...state,
        loading: false,
        banks: action.payload,
      };
    }
    case Actions.GET_BANKS_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default banksReducer;
