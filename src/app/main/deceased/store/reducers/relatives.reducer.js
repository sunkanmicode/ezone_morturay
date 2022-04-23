import * as Actions from '../actions';

const initialState = {
  loading: false,
  relatives: [],
  relative: null,
  message: null,
};

const relativesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_DECEASED_RELATIVES: {
      return {
        ...state,
        relatives: action.payload,
      };
    }
    case Actions.GET_RELATIVE_BY_ID: {
      return {
        ...state,
        relative: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default relativesReducer;
