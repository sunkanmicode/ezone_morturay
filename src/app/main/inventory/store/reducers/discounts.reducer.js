import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: "",
  discounts: [],
  discount: null,
  message: null,
  discountDialog: {
    open: false,
    type: "new", // new
    data: null
  }
};

const discountsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_DISCOUNTS: {
      return {
        ...state,
        discounts: action.payload,
      };
    }
    case Actions.GET_DISCOUNT_BY_ID: {
      return {
        ...state,
        loading: false,
        discount: action.payload,
      };
    }
    case Actions.CREATE_DISCOUNT: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.CREATE_DISCOUNT_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.CREATE_DISCOUNT_ERROR: {
      return {
        ...state,
        loading: false,
        message: action.payload
      };
    }
    case Actions.UPDATE_DISCOUNT: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.DELETE_ITEM: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        loading: false,
        searchText: action.searchText,
      };
    }
    case Actions.OPEN_DISCOUNT_DIALOG: {
      return {
        ...state,
        discountDialog: {
          ...state.discountDialog,
          open: true,
          type: "new",
          data: action.payload
        }
      };
    }
    case Actions.CLOSE_DISCOUNT_DIALOG: {
      return {
        ...state,
        discountDialog: {
          ...state.discountDialog,
          open: false,
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_DISCOUNT_DIALOG: {
      return {
        ...state,
        discountDialog: {
          ...state.discountDialog,
          open: true,
          type: "edit",
          data: action.payload
        }
      };
    }
    case Actions.CLOSE_EDIT_DISCOUNT_DIALOG: {
      return {
        ...state,
        discountDialog: {
          ...state.discountDialog,
          open: false,
          data: null
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default discountsReducer;
