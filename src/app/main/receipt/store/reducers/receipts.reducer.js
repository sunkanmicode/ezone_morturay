import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: "",
  receipts: {
    totalItems: 0,
    receipts: [],
    totalPages: 0,
    currentPage: 0
  },
  receipt: null,
  message: null,
};

const receiptsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_RECEIPTS: {
      return {
        ...state,
        receipts: action.payload,
      };
    }
    case Actions.GET_RECEIPT_BY_ID: {
      return {
        ...state,
        receipt: action.payload,
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    default: {
      return state;
    }
  }
};

export default receiptsReducer;
