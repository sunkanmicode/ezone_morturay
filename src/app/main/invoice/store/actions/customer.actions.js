import axios from 'axios';

export const GET_CUSTOMERS = '[CUSTOMER APP] GET CUSTOMERS';

export function getCustomers(page=0, size=500) {
  const request = axios.get('/api/v1/customers', { params: { page, size } });

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "response")
      dispatch({
        type: GET_CUSTOMERS,
        payload: response.data.data,
      })
    });
}
