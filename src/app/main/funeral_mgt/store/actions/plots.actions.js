import axios from 'axios';
import * as Actions from "./"
import { showMessage } from '../../../../../app/store/actions/fuse';
import history from "../../../../../@history"

export const GET_PLOTS = '[PLOTS APP] GET PLOTS';
export const GET_PLOT_BY_ID = '[PLOTS APP] GET PLOT BY ID';
export const SET_SEARCH_TEXT = '[PLOTS APP] SET SEARCH TEXT';

export const OPEN_PLOT_DIALOG = '[PLOTS APP] OPEN PLOT DIALOG';
export const CLOSE_PLOT_DIALOG = '[PLOTS APP] CLOSE PLOT DIALOG';

export const OPEN_EDIT_PLOT_DIALOG = '[PLOTS APP] OPEN EDIT PLOT DIALOG';
export const CLOSE_EDIT_PLOT_DIALOG = '[PLOTS APP] CLOSE EDIT PLOT DIALOG';

export const CREATE_PLOT = '[PLOTS APP] CREATE PLOT';
export const CREATE_PLOT_PROGRESS = '[PLOTS APP] CREATE PLOT PROGRESS';
export const CREATE_PLOT_ERROR = '[PLOTS APP] CREATE PLOT ERROR';

export const UPDATE_PLOT = '[PLOTS APP] UPDATE PLOT';

export const DELETE_PLOT = '[PLOTS APP] DELETE PLOT';

export function createPlot(data) {
  const request = axios.post('/api/v1/plots', data);

  return (dispatch) => {
    dispatch({ type: CREATE_PLOT_PROGRESS })

    request.then((response) => {
      dispatch(showMessage({ message: 'Plot created successfully' }));

      Promise.all([
        dispatch({
          type: CREATE_PLOT,
          payload: response.data.data,
        }),
      ]).then(() => {
        dispatch(Actions.closePlotDialog())
        dispatch(Actions.getPlots());
        history.push("/plots")
      });    
    })
    .catch(err => {
      if(err.response && err.response.data){
        dispatch(showMessage({ message: 'Plot failed to create' }));
      }
      dispatch({ type: CREATE_PLOT_ERROR })
    });
  };
}

export function getPlots(page=0, size=10) {
  const request = axios.get('/api/v1/plots', { params: { page, size } });

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_PLOTS,
        payload: response.data.data
      })
    );
}

export function getPlotById(id) {
  const request = axios.get('/api/v1/plots/' + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_PLOT_BY_ID,
        payload: response.data.data
      })
    );
}

export function updatePlot(data, id) {
  const request = axios.put('/api/v1/plots/' + id, data);

  return (dispatch) => {
    dispatch({ type: CREATE_PLOT_PROGRESS })

    request.then((response) => {
      dispatch(showMessage({ message: 'Plot updated successfully' }));

      Promise.all([
        dispatch({
          type: UPDATE_PLOT,
          payload: response.data.data,
        }),
      ]).then(() => {
        dispatch(Actions.closeEditPlotDialog())
        dispatch(Actions.getPlots());
        history.push("/plots")
      });    
    })
    .catch(err => {
      if(err.response && err.response.data){
        dispatch(showMessage({ message: 'Plot failed to update' }));
      }
      dispatch({ type: CREATE_PLOT_ERROR })
    });
  };
}

export function deletePlot(id) {
  const request = axios.delete('/api/v1/plots/' + id);

  return (dispatch) => {
    request.then((response) => {
      dispatch(showMessage({ message: 'Plot deleted successfully' }));

      Promise.all([
        dispatch({
          type: DELETE_PLOT,
          payload: response.data.data,
        }),
      ]).then(() => {
        dispatch(Actions.getPlots());
        history.push("/plots")
      });    
    })
    .catch(err => {
      if(err.response && err.response.data){
        dispatch(showMessage({ message: 'Plot failed to delete' }));
      }
    });
  };
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openPlotDialog(payload) {
  return {
    type: OPEN_PLOT_DIALOG,
    payload
  };
}

export function closePlotDialog() {
  return {
    type: CLOSE_PLOT_DIALOG,
  };
}

export function openEditPlotDialog(payload) {
  return {
    type: OPEN_EDIT_PLOT_DIALOG,
    payload
  };
}

export function closeEditPlotDialog() {
  return {
    type: CLOSE_EDIT_PLOT_DIALOG,
  };
}