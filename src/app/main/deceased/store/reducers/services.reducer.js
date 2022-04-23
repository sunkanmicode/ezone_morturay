import * as Actions from '../actions';

const initialState = {
  loading: false,
  services: [],
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
