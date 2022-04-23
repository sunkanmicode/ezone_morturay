import * as Actions from '../../actions/ezone';

const initialState = {
  loading: false,
  branches: [],
  branch: null,
  message: null,
};

const branchesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.LOADING_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.UPDATE_BRANCH: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.GET_BRANCHES: {
      return {
        ...state,
        branches: action.payload,
      };
    }
    case Actions.GET_BRANCH_BY_ID: {
      return {
        ...state,
        branch: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default branchesReducer;
