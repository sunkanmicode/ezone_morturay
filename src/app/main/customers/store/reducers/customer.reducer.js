import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: "",
  customers: {
    count: 0,
    customers: [],
    totalPages: 0,
    currentPage: 0,
  },
  customer: null,
  message: null,
  customerDialog: {
    props: { open: false },
    data: null,
  },
  deceasedByCustomer: [],
  branches: [],
};

const customerReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_DECEASED_BY_CUSTOMER: {
      return {
        ...state,
        deceasedByCustomer: action.payload,
      };
    }
    case Actions.GET_CUSTOMERS: {
      return {
        ...state,
        customers: action.payload,
      };
    }
    case Actions.GET_BRANCHES: {
      return {
        ...state,
        branches: action.payload,
      };
    }
    case Actions.CREATE_RETURNING_CUSTOMER: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.CREATE_CUSTOMER_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.CREATE_CUSTOMER_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.GET_CUSTOMER_BY_ID: {
      return {
        ...state,
        loading: false,
        customer: action.payload,
      };
    }
    case Actions.CREATE_CUSTOMER: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.UPDATE_CUSTOMER: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.UPDATE_CUSTOMER_ERROR: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case Actions.OPEN_EDIT_CUSTOMER_DIALOG: {
      return {
        ...state,
        customerDialog: {
          props: { open: true },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_EDIT_CUSTOMER_DIALOG: {
      return {
        ...state,
        customerDialog: {
          props: { open: false },
          data: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default customerReducer;
