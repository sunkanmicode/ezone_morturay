import axios from 'axios';

export const GET_RECEIPTS = '[CUSTOMER APP] GET RECEIPTS';
export const GET_RECEIPT_BY_ID = '[CUSTOMER APP] GET RECEIPT BY ID';
export const SET_SEARCH_TEXT = '[CUSTOMER APP] SET SEARCH TEXT';

export function getReceipts(page=0, size=10) {
  const request = axios.get('/api/v1/receipts', { params: { page, size } });

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "receipts response")
      dispatch({
        type: GET_RECEIPTS,
        payload: response.data.data,
      })
    });
}

export function getReceiptById(id) {
  const request = axios.get('/api/v1/receipts/' + id);
  console.log(request, "receipt BY ID response")

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_RECEIPT_BY_ID,
        payload: response.data.data,
      })
    });
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}