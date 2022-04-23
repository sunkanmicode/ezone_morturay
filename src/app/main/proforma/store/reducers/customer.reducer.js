import * as Actions from '../actions';

const initialState = {
  loading: false,
  customers: {
    count: 0,
    totalPages: 0,
    customers: [],
    currentPage: 0
  },
  message: null,
};

const customerReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_CUSTOMERS: {
      return {
        ...state,
        customers: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default customerReducer;
