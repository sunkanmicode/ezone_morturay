import * as Actions from '../actions';

const initialState = {
  searchText: '',
  employees: []
};

const employeesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_EMPLOYEES: {
      return {
        ...state,
        employees: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default employeesReducer;
