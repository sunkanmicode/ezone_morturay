import axios from 'axios';

export const PAY_FOR_INVOICE = '[PAYMENTS APP] PAY FOR INVOICE';

export const OPEN_INVOICE_PAYMENT_DIALOG = '[INVENTORY APP] OPEN INVOICE PAYMENT DIALOG';
export const CLOSE_INVOICE_PAYMENT_DIALOG = '[INVENTORY APP] CLOSE INVOICE PAYMENT DIALOG';

export function payForInvoice(id) {
  const request = axios.post(`/api/v1/payments/invoice_id/${id}/pay`);

  console.log(request, "request pay for invoice")

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: PAY_FOR_INVOICE,
        payload: response.data.data,
      })
    );
}

export function openInvoicePaymentDialog(payload) {
  return {
    type: OPEN_INVOICE_PAYMENT_DIALOG,
    payload
  }
}

export function closeInvoicePaymentDialog() {
  return {
    type: CLOSE_INVOICE_PAYMENT_DIALOG,
  }
}