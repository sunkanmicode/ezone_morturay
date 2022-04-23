import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: '',
  plots: {
    count: 0,
    plots: [],
    totalPages: 0,
    currentPage: 0
  },
  plot: null,
  plotDialog: {
    type: "new",
    props: {
      open: false,
    },
    data: null,
  },
};

const plotsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_PLOTS: {
      return {
        ...state,
        plots: action.payload,
      };
    }
    case Actions.GET_PLOT_BY_ID: {
      return {
        ...state,
        plot: action.payload,
      };
    }
    case Actions.CREATE_PLOT: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.CREATE_PLOT_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.CREATE_PLOT_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.UPDATE_PLOT: {
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
    case Actions.OPEN_PLOT_DIALOG: {
      return {
        ...state,
        plotDialog: {
          type: "new",
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_PLOT_DIALOG: {
      return {
        ...state,
        plotDialog: {
          ...state.plotDialog,
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.OPEN_EDIT_PLOT_DIALOG: {
      return {
        ...state,
        plotDialog: {
          type: "edit",
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_EDIT_PLOT_DIALOG: {
      return {
        ...state,
        plotDialog: {
          ...state.plotDialog,
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

export default plotsReducer;
