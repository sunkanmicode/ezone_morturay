import axios from 'axios';

export const GET_INVOICES = '[CUSTOMER APP] GET INVOICES';

export function getInvoices() {
  const request = axios.get('/api/v1/invoices');

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "response")
      dispatch({
        type: GET_INVOICES,
        payload: response.data.data,
      })
    });
}
