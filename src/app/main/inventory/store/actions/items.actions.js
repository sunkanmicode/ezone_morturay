import axios from 'axios';
import { showMessage } from '../../../../../app/store/actions/fuse';
import * as Actions from './';
import history from "../../../../../@history"

export const CREATE_ITEM = '[INVENTORY ITEM APP] CREATE ITEM';
export const UPDATE_ITEM = '[INVENTORY ITEM APP] UPDATE ITEM';
export const DELETE_ITEM = '[INVENTORY ITEM APP] DELETE ITEM';
export const GET_ITEMS = '[INVENTORY ITEM APP] GET ITEMS';
export const GET_ITEM_BY_ID = '[INVENTORY ITEM APP] GET ITEM BY ID';

export const OPEN_ITEM_DIALOG = '[INVENTORY ITEM APP] OPEN_ITEM_DIALOG';
export const CLOSE_ITEM_DIALOG = '[INVENTORY ITEM APP] CLOSE_ITEM_DIALOG';

export const SET_SEARCH_TEXT = '[INVENTORY ITEM APP] SET SEARCH TEXT';

export function createItem(data) {
  const request = axios.post('/api/v1/items', data);
  console.log(request, 'creating item request');

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Item created successfully' }));

        Promise.all([
          dispatch({
            type: CREATE_ITEM,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getItems());
          history.push("/inventory/items");
        });
      } else {
        dispatch(showMessage({ message: 'Item creation failed' }));
      }
    });
  };
}

export function getItems() {
  const request = axios.get('/api/v1/items');

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "response")
      dispatch({
        type: GET_ITEMS,
        payload: response.data.data,
      })
    });
}

export function getItemById(id) {
  const request = axios.get('/api/v1/items/' + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_ITEM_BY_ID,
        payload: response.data.data,
      })
    );
}

export function updateItem(data) {
  const request = axios.put('/api/v1/items/' + data.id, data);

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Item updated successfully' }));

        Promise.all([
          dispatch({
            type: UPDATE_ITEM,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getItems());
          history.push("/inventory/items");
        });
      } else {
        dispatch(showMessage({ message: 'Item update failed' }));
      }
    });
  };
}

export function deleteItem(id) {
  const request = axios.delete('/api/v1/items/' + id);

  console.log(request, "request for item delete")

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Item deleted successfully' }));

        Promise.all([
          dispatch({
            type: DELETE_ITEM,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getItems());
          history.push("/inventory/items");
        });
      } else {
        dispatch(showMessage({ message: 'Item delete failed' }));
      }
    });
  };
}

export function openItemDialog(payload) {
  return {
    type: OPEN_ITEM_DIALOG,
    payload
  }
}

export function closeItemDialog() {
  return {
    type: CLOSE_ITEM_DIALOG,
  }
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}