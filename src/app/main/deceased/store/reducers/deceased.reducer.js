import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: "",
  allDeceased: {
    deceased: [],
    count: 0,
    currentPage: 0,
    totalPages: 0,
  },
  allReleasedForm: {
    releasedForm: [],
    count: 0,
    currentPage: 0,
    totalPages: 0,
  },
  releasedForm: null,
  deceased: null,
  embalmmentCert: null,
  cremationCert: null,
  releaseFormDialog: {
    props: {
      open: false,
    },
    data: null,
  },
  deceasedOtherDocuments: null,
  addDeceasedDocuments: {
    props: {
      open: false,
    },
    data: null,
  },
 summaryReleased: null,
  message: null,
  bankDetailsByBranch: [],
  branches: [],
};

const deceasedReducer = function (state = initialState, action) {
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

    case Actions.SET_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }

    case Actions.STOP_PROGRESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.GET_ALL_DECEASED: {
      return {
        ...state,
        allDeceased: action.payload,
      };
    }
    case Actions.GET_DECEASED_BY_ID: {
      return {
        ...state,
        loading: false,
        deceased: action.payload,
      };
    }
    case Actions.CREATE_DECEASED: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.UPDATE_DECEASED: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }

    //add get released form
    case Actions.GET_RELEASED_FORMS: {
      return {
        ...state,
        allReleasedForm: action.payload,
      };
    }
    case Actions.ADD_RELEASE_FORM: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }

    //GET RELEASED FORM BY ID
    case Actions.GET_RELEASED_FORM_BY_ID: {
      return {
        ...state,
        loading: false,
        releasedForm: action.payload,
      };
    }
    case Actions.GET_RELEASED_FORM_BY_DECEASED_ID: {
      return {
        ...state,
        loading: false,
        summaryReleased: action.payload,
      };
    }

    case Actions.PRINT_ADMISSION_FORM: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.PRINT_EMBALMMENT_CERTIFICATE: {
      return {
        ...state,
        loading: false,
        embalmmentCert: action.payload,
      };
    }
    case Actions.PRINT_CREMATION_CERTIFICATE: {
      return {
        ...state,
        loading: false,
        cremationCert: action.payload,
      };
    }
    //Open and Close Add Doceased Documents
    case Actions.OPEN_ADD_DECEASED_DOCUMENTS: {
      return {
        ...state,
        addDeceasedDocuments: {
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_ADD_DECEASED_DOCUMENTS: {
      return {
        ...state,
        addDeceasedDocuments: {
          props: {
            open: false,
          },
          data: action.payload,
        },
      };
    }

    //Open Release Form Dialog
    case Actions.OPEN_RELEASE_FORM_DIALOG: {
      return {
        ...state,
        releaseFormDialog: {
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_RELEASE_FORM_DIALOG: {
      return {
        ...state,
        releaseFormDialog: {
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        loading: false,
        searchText: action.searchText,
      };
    }
    //deceased other document
    case Actions.DECEASED_OTHER_DOCUMENTS: {
      return {
        ...state,
        deceasedOtherDocuments: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default deceasedReducer;
