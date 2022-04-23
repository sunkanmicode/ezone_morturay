import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: '',
  proformaInvoices: {
    totalItems: 0,
    invoices: [],
    totalPages: 0,
    currentPage: 0
  },
  proformaInvoice: null,
  proformainvoiceDialog: {
    props: {
      open: false,
    },
    data: null,
  },
  bankDetailsByBranch:[]
};

const proformaInvoicesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.BANK_DETAILS_BY_BRANCH: {
      return {
        ...state,
        bankDetailsByBranch: action.payload,
      };
    }
    
    case Actions.GET_PROFORMA_INVOICES: {
      return {
        ...state,
        proformaInvoices: action.payload,
      };
    }
    case Actions.GET_PROFORMA_INVOICE_BY_ID: {
      return {
        ...state,
        proformaInvoice: action.payload,
      };
    }
    case Actions.GENERATE_PROFORMA_INVOICE: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.GENERATE_PROFORMA_INVOICE_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.GENERATE_PROFORMA_INVOICE_ERROR: {
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
    case Actions.OPEN_PROFORMA_INVOICE_DIALOG: {
      return {
        ...state,
        proformainvoiceDialog: {
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_PROFORMA_INVOICE_DIALOG: {
      return {
        ...state,
        proformainvoiceDialog: {
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

export default proformaInvoicesReducer;
