import axios from 'axios';

export const GET_SERVICES = '[CUSTOMER APP] GET SERVICES';

export function getServices() {
  const request = axios.get('/api/v1/services');

  console.log(request, "get service request")

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_SERVICES,
        payload: response.data.data,
      })
    });
}