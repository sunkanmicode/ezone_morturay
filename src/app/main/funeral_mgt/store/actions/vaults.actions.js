import axios from 'axios';
import * as Actions from "."
import { showMessage } from '../../../../store/actions/fuse';
import history from "../../../../../@history"

export const GET_VAULTS = '[VAULTS APP] GET VAULTS';
export const GET_VAULT_BY_ID = '[VAULTS APP] GET VAULT BY ID';
export const SET_SEARCH_TEXT = '[VAULTS APP] SET SEARCH TEXT';

export const OPEN_VAULT_DIALOG = '[VAULTS APP] OPEN VAULT DIALOG';
export const CLOSE_VAULT_DIALOG = '[VAULTS APP] CLOSE VAULT DIALOG';

export const OPEN_EDIT_VAULT_DIALOG = '[VAULTS APP] OPEN EDIT VAULT DIALOG';
export const CLOSE_EDIT_VAULT_DIALOG = '[VAULTS APP] CLOSE EDIT VAULT DIALOG';

export const CREATE_VAULT = '[VAULTS APP] CREATE VAULT';
export const CREATE_VAULT_PROGRESS = '[VAULTS APP] CREATE VAULT PROGRESS';
export const CREATE_VAULT_ERROR = '[VAULTS APP] CREATE VAULT ERROR';

export const UPDATE_VAULT = '[VAULTS APP] UPDATE VAULT';

export const DELETE_VAULT = '[VAULTS APP] DELETE VAULT';

export function createVault(data) {
  const request = axios.post('/api/v1/vaults', data);

  return (dispatch) => {
    dispatch({ type: CREATE_VAULT_PROGRESS })

    request.then((response) => {
      dispatch(showMessage({ message: 'Vault created successfully' }));

      Promise.all([
        dispatch({
          type: CREATE_VAULT,
          payload: response.data.data,
        }),
      ]).then(() => {
        dispatch(Actions.closeVaultDialog())
        dispatch(Actions.getVaults());
        history.push("/vaults")
      });    
    })
    .catch(err => {
      if(err.response && err.response.data){
        console.log(err.response.data)
        dispatch(showMessage({ message: 'Vault failed to create' }));
      }
      dispatch({ type: CREATE_VAULT_ERROR })
    });
  };
}

export function getVaults(page=0, size=50) {
  const request = axios.get('/api/v1/vaults', { params: { page, size } });
  // console.log(request, "request vaults all")

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_VAULTS,
        payload: response.data.data
      })
    );
}

export function getVaultById(id) {
  const request = axios.get('/api/v1/vaults/' + id);

  console.log(request, "request vault by id")

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_VAULT_BY_ID,
        payload: response.data.data
      })
    );
}

export function updateVault(data, id) {
  const request = axios.put('/api/v1/vaults/' + id, data);

  return (dispatch) => {
    dispatch({ type: CREATE_VAULT_PROGRESS })

    request.then((response) => {
      dispatch(showMessage({ message: 'Vault updated successfully' }));

      Promise.all([
        dispatch({
          type: UPDATE_VAULT,
          payload: response.data.data,
        }),
      ]).then(() => {
        dispatch(Actions.closeEditVaultDialog())
        dispatch(Actions.getVaults());
        history.push("/vaults")
      });    
    })
    .catch(err => {
      if(err.response && err.response.data){
        console.log(err.response.data)
        dispatch(showMessage({ message: 'Vault failed to update' }));
      }
      dispatch({ type: CREATE_VAULT_ERROR })
    });
  };
}

export function deleteVault(id) {
  const request = axios.delete('/api/v1/vaults/' + id);

  return (dispatch) => {
    request.then((response) => {
      dispatch(showMessage({ message: 'Vault deleted successfully' }));

      Promise.all([
        dispatch({
          type: DELETE_VAULT,
          payload: response.data.data,
        }),
      ]).then(() => {
        dispatch(Actions.getVaults());
        history.push("/vaults")
      });    
    })
    .catch(err => {
      if(err.response && err.response.data){
        console.log(err.response.data)
        dispatch(showMessage({ message: 'Vault failed to delete' }));
      }
      dispatch({ type: CREATE_VAULT_ERROR })
    });
  };
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openVaultDialog(payload) {
  return {
    type: OPEN_VAULT_DIALOG,
    payload
  };
}

export function closeVaultDialog() {
  return {
    type: CLOSE_VAULT_DIALOG,
  };
}

export function openEditVaultDialog(payload) {
  return {
    type: OPEN_EDIT_VAULT_DIALOG,
    payload
  };
}

export function closeEditVaultDialog() {
  return {
    type: CLOSE_EDIT_VAULT_DIALOG,
  };
}