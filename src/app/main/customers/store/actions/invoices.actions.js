import axios from 'axios';
export const GET_PAYMENT_ADVICE = '[INVOICES APP] GET PAYMENT ADVICE';
export const ADD_INVOICE = '[INVOICES APP] ADD INVOICE';

export function getPaymentAdvice(id) {
  const request = axios.get(`/api/v1/invoices/customer_id/${id}/payment_advice`);

  console.log(request, "request payment advice")

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_PAYMENT_ADVICE,
        payload: response.data.data,
      })
    );
}