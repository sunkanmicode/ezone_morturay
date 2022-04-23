import axios from 'axios';
import { showMessage } from '../../../../../app/store/actions/fuse';
import * as Actions from './';
import history from "../../../../../@history"

export const CREATE_DISCOUNT = '[INVENTORY APP] CREATE DISCOUNT';
export const CREATE_DISCOUNT_PROGRESS = '[INVENTORY APP] CREATE DISCOUNT PROGRESS';
export const CREATE_DISCOUNT_ERROR = '[INVENTORY APP] CREATE DISCOUNT ERROR';

export const UPDATE_DISCOUNT = '[INVENTORY APP] UPDATE DISCOUNT';
export const DELETE_DISCOUNT = '[INVENTORY APP] DELETE DISCOUNT';
export const GET_DISCOUNTS = '[INVENTORY APP] GET DISCOUNTS';
export const GET_DISCOUNT_BY_ID = '[INVENTORY APP] GET DISCOUNT BY ID';

export const OPEN_DISCOUNT_DIALOG = '[INVENTORY APP] OPEN DISCOUNT DIALOG';
export const CLOSE_DISCOUNT_DIALOG = '[INVENTORY APP] CLOSE DISCOUNT DIALOG';

export const OPEN_EDIT_DISCOUNT_DIALOG = '[INVENTORY APP] OPEN EDIT DISCOUNT DIALOG';
export const CLOSE_EDIT_DISCOUNT_DIALOG = '[INVENTORY APP] CLOSE EDIT DISCOUNT DIALOG';

export const SET_SEARCH_TEXT = '[INVENTORY DISCOUNT APP] SET SEARCH TEXT';

export function createDiscount(data) {
  const request = axios.post('/api/v1/discounts', data);

  return (dispatch) => {
    dispatch({ type: CREATE_DISCOUNT_PROGRESS })
    request.then((response) => {
      dispatch(showMessage({ message: 'Discount created successfully' }));

      Promise.all([
        dispatch({
          type: CREATE_DISCOUNT,
          payload: response.data,
        }),
      ]).then(() => {
        dispatch(Actions.getDiscounts());
        history.push("/inventory/discounts");
      });  
    })
    .catch(err => {
      if(err.response && err.response.data){
        dispatch(showMessage({ message: 'Discount creation failed' }));
        dispatch({ type: CREATE_DISCOUNT_ERROR })
      }
    });
  };
}

export function getDiscounts() {
  const request = axios.get('/api/v1/discounts');

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_DISCOUNTS,
        payload: response.data.data,
      })
    });
}

export function getDiscountById(id) {
  const request = axios.get('/api/v1/discounts/' + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_DISCOUNT_BY_ID,
        payload: response.data.data,
      })
    );
}

export function updateDiscount(data) {
  const request = axios.put('/api/v1/discounts/' + data.id, data);

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Discount updated successfully' }));

        Promise.all([
          dispatch({
            type: UPDATE_DISCOUNT,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getDiscounts());
          history.push("/inventory/discounts");
        });
      } else {
        dispatch(showMessage({ message: 'Discount update failed' }));
      }
    });
  };
}

export function deleteDiscount(id) {
  const request = axios.delete('/api/v1/discounts/' + id);

  console.log(request, "request for discount delete")

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Discount deleted successfully' }));

        Promise.all([
          dispatch({
            type: DELETE_DISCOUNT,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getDiscounts());
          history.push("/inventory/discounts");
        });
      } else {
        dispatch(showMessage({ message: 'Discount delete failed' }));
      }
    });
  };
}

export function openDiscountDialog(payload) {
  return {
    type: OPEN_DISCOUNT_DIALOG,
    payload
  }
}

export function closeDiscountDialog() {
  return {
    type: CLOSE_DISCOUNT_DIALOG,
  }
}

export function openEditDiscountDialog(payload) {
  return {
    type: OPEN_EDIT_DISCOUNT_DIALOG,
    payload
  }
}

export function closeEditDiscountDialog() {
  return {
    type: CLOSE_EDIT_DISCOUNT_DIALOG,
  }
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}