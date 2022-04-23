import * as Actions from '../actions';

const initialState = {
  loading: false,
  branchDialog: {
    type: 'edit',
    props: {
      open: false,
    },
    data: null,
  },
  message: null,
};

const branchReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.OPEN_BRANCH_DIALOG: {
      return {
        ...state,
        branchDialog: {
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_BRANCH_DIALOG: {
      return {
        ...state,
        branchDialog: {
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default branchReducer;
