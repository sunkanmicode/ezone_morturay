import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: "",
  invoices: {
    totalItems: 0,
    invoices: [],
    totalPages: 0,
    currentPage: 0,
  },
  newServiceAdded: null,
  invoice: null,
  selectedInvoiceIds: [],
  paymentAdvice: null,
  paymentDialog: {
    props: {
      open: false,
    },
    data: null,
  },
  sendInvoiceDialog: {
    type: "new",
    props: {
      open: false,
    },
    data: null,
  },
  recordPaymentDialog: {
    type: "new",
    props: {
      open: false,
    },
    data: null,
  },
  addServiceDialog: {
    type: "new",
    props: {
      open: false,
    },
    data: null,
  },
  bankDetailsByBranch: [],
};

const invoicesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.BANK_DETAILS_BY_BRANCH: {
      return {
        ...state,
        bankDetailsByBranch: action.payload,
      };
    }
    case Actions.GET_INVOICES: {
      return {
        ...state,
        invoices: action.payload,
      };
    }
    case Actions.ADD_SERVICE:{
      return{
        ...state,
        newServiceAdded: action.payload,
      }
    }
    case Actions.GET_INVOICE_BY_ID: {
      return {
        ...state,
        invoice: action.payload,
      };
    }
    case Actions.SEND_INVOICE: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.INITIALIZE_INVOICE_PAYMENT: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.RECORD_INVOICE_PAYMENT: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.GET_PAYMENT_ADVICE: {
      return {
        ...state,
        paymentAdvice: action.payload,
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    // case Actions.SELECT_ALL_INVOICES: {
    //   const arr = Object.keys(state.entities).map((k) => state.entities[k]);

    //   const selectedInvoiceIds = arr.map((invoice) => invoice.id);

    //   return {
    //     ...state,
    //     selectedInvoiceIds: selectedInvoiceIds,
    //   };
    // }
    case Actions.DESELECT_ALL_INVOICES: {
      return {
        ...state,
        selectedInvoiceIds: [],
      };
    }
    case Actions.OPEN_INVOICE_PAYMENT_DIALOG: {
      return {
        ...state,
        paymentDialog: {
          props: {
            open: true,
          },
          data: null,
        },
      };
    }
    case Actions.CLOSE_INVOICE_PAYMENT_DIALOG: {
      return {
        ...state,
        paymentDialog: {
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.OPEN_SEND_INVOICE_DIALOG: {
      return {
        ...state,
        sendInvoiceDialog: {
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_SEND_INVOICE_DIALOG: {
      return {
        ...state,
        sendInvoiceDialog: {
          props: {
            open: false,
          },
          data: null,
        },
      };
    }

    case Actions.OPEN_ADD_SERVICE_DIALOG: {
      return {
        ...state,
        addServiceDialog: {
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_ADD_SERVICE_DIALOG: {
      return {
        ...state,
        addServiceDialog: {
          props: {
            open: false,
          },
          data: null,
        },
      };
    }

    case Actions.OPEN_NEW_RECORD_PAYMENT_DIALOG: {
      return {
        ...state,
        recordPaymentDialog: {
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_NEW_RECORD_PAYMENT_DIALOG: {
      return {
        ...state,
        recordPaymentDialog: {
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

export default invoicesReducer;
