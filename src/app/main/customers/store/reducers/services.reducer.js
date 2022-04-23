import * as Actions from '../actions';

const initialState = {
  loading: false,
  services: {
    count: 0,
    totalPages: 0,
    services: [],
    currentPage: 0
  },
  message: null,
};

const servicesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_SERVICES: {
      return {
        ...state,
        services: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default servicesReducer;
