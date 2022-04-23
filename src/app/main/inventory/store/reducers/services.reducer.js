import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: "",
  services: {
    count: 0,
    totalPages: 0,
    services: [],
    currentPage: 0
  },
  service: null,
  message: null,
  serviceDialog: {
    open: false,
    type: "edit",
    data: null
  },
  confirmDeleteServiceDialog: {
    open: false,
    data: null
  }
};

const servicesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_SERVICES: {
      return {
        ...state,
        services: action.payload,
      };
    }
    case Actions.GET_SERVICE_BY_ID: {
      return {
        ...state,
        loading: false,
        service: action.payload,
      };
    }
    case Actions.CREATE_SERVICE: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.CREATE_SERVICE_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.CREATE_SERVICE_ERROR: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.UPDATE_SERVICE: {
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
    case Actions.OPEN_SERVICE_DIALOG: {
      return {
        ...state,
        serviceDialog: {
          open: true,
          type: "new",
          data: action.payload
        }
      };
    }
    case Actions.CLOSE_SERVICE_DIALOG: {
      return {
        ...state,
        serviceDialog: {
          open: false,
          type: "new",
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_SERVICE_DIALOG: {
      return {
        ...state,
        serviceDialog: {
          open: true,
          type: "edit",
          data: action.payload
        }
      };
    }
    case Actions.CLOSE_EDIT_SERVICE_DIALOG: {
      return {
        ...state,
        serviceDialog: {
          open: false,
          type: "edit",
          data: null
        }
      };
    }
    case Actions.OPEN_DELETE_CONFIRM_SERVICE_DIALOG: {
      return {
        ...state,
        confirmDeleteServiceDialog: {
          open: true,
          data: action.payload
        }
      };
    }
    case Actions.CLOSE_DELETE_CONFIRM_SERVICE_DIALOG: {
      return {
        ...state,
        confirmDeleteServiceDialog: {
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

export default servicesReducer;
