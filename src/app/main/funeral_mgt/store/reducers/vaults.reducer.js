import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: '',
  vaults: {
    count: 0,
    vaults: [],
    totalPages: 0,
    currentPage: 0
  },
  vault: null,
  vaultDialog: {
    type: "new",
    props: {
      open: false,
    },
    data: null,
  },
};

const vaultsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_VAULTS: {
      return {
        ...state,
        vaults: action.payload,
      };
    }
    case Actions.GET_VAULT_BY_ID: {
      return {
        ...state,
        vault: action.payload,
      };
    }
    case Actions.CREATE_VAULT: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.CREATE_VAULT_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.CREATE_VAULT_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.UPDATE_VAULT: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case Actions.OPEN_VAULT_DIALOG: {
      return {
        ...state,
        vaultDialog: {
          type: "new",
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_VAULT_DIALOG: {
      return {
        ...state,
        vaultDialog: {
          ...state.vaultDialog,
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.OPEN_EDIT_VAULT_DIALOG: {
      return {
        ...state,
        vaultDialog: {
          type: "edit",
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_EDIT_VAULT_DIALOG: {
      return {
        ...state,
        vaultDialog: {
          ...state.vaultDialog,
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

export default vaultsReducer;
