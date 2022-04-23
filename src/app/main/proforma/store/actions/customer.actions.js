import axios from 'axios';

export const GET_CUSTOMERS = '[CUSTOMER APP] GET CUSTOMERS';

export function getCustomers() {
  const request = axios.get('/api/v1/customers');

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "response")
      dispatch({
        type: GET_CUSTOMERS,
        payload: response.data.data,
      })
    });
}
