import axios from 'axios';

export const GET_DISCOUNTS = '[CUSTOMER APP] GET DISCOUNTS';

export function getDiscounts() {
  const request = axios.get('/api/v1/discounts');
  console.log(request, "request discounts")

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "discount list response")
      dispatch({
        type: GET_DISCOUNTS,
        payload: response.data.data,
      })
    });
}