import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: '',
  vouchers: {
    count: 0,
    vouchers: [],
    totalPages: 0,
    currentPage: 0
  },
  voucher: null,
  voucherDialog: {
    type: "new",
    props: {
      open: false,
    },
    data: null,
  },
  bankDetailsByBranch:[],
  branches: [],
};

const vouchersReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.BANK_DETAILS_BY_BRANCH: {
      return {
        ...state,
        bankDetailsByBranch: action.payload,
      };
    }

    case Actions.GET_BRANCHES: {
      return {
        ...state,
        branches: action.payload,
      };
    }
    
    case Actions.GET_VOUCHERS: {
      return {
        ...state,
        vouchers: action.payload,
      };
    }
    case Actions.GET_VOUCHER_BY_ID: {
      return {
        ...state,
        voucher: action.payload,
      };
    }
    case Actions.GENERATE_VOUCHER: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.GENERATE_VOUCHER_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.GENERATE_VOUCHER_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.UPDATE_VOUCHER: {
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
    case Actions.OPEN_VOUCHER_DIALOG: {
      return {
        ...state,
        voucherDialog: {
          type: "new",
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_VOUCHER_DIALOG: {
      return {
        ...state,
        voucherDialog: {
          ...state.voucherDialog,
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.OPEN_EDIT_VOUCHER_DIALOG: {
      return {
        ...state,
        voucherDialog: {
          type: "edit",
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_EDIT_VOUCHER_DIALOG: {
      return {
        ...state,
        voucherDialog: {
          ...state.voucherDialog,
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

export default vouchersReducer;
