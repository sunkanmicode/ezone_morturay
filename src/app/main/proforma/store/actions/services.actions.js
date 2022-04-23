import axios from 'axios';

export const GET_SERVICES = '[CUSTOMER APP] GET SERVICES';

export function getServices(page=0, size=500) {
  const request = axios.get('/api/v1/services', { params: {page, size} });

  console.log(request, "get service request")

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_SERVICES,
        payload: response.data.data,
      })
    });
}