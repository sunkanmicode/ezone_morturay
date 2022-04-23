import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: "",
  items: [],
  item: null,
  message: null,
  itemDialog: {
    open: false,
    type: "edit", // new
    data: null
  }
};

const itemsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case Actions.GET_ITEM_BY_ID: {
      return {
        ...state,
        loading: false,
        item: action.payload,
      };
    }
    case Actions.CREATE_ITEM: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.UPDATE_ITEM: {
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
    case Actions.OPEN_ITEM_DIALOG: {
      return {
        ...state,
        itemDialog: {
          ...state.itemDialog,
          open: true,
          data: action.payload
        }
      };
    }
    case Actions.CLOSE_ITEM_DIALOG: {
      return {
        ...state,
        itemDialog: {
          ...state.itemDialog,
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

export default itemsReducer;
