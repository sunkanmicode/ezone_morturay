import axios from 'axios';
import * as Actions from "./"
import { showMessage } from '../../../../../app/store/actions/fuse';
import { authServerAxios } from '../../../../fuse-configs/baseURL';
// import history from "../../../../../@history"

export const GET_PROFORMA_INVOICES = '[INVOICES APP] GET PROFORMA INVOICES';
export const GET_PROFORMA_INVOICE_BY_ID = '[INVOICES APP] GET PROFORMA INVOICE BY ID';
export const SET_SEARCH_TEXT = '[INVOICES APP] SET SEARCH TEXT';

export const OPEN_PROFORMA_INVOICE_DIALOG = '[INVOICES APP] OPEN PROFORMA INVOICE DIALOG';
export const CLOSE_PROFORMA_INVOICE_DIALOG = '[INVOICES APP] CLOSE PROFORMA INVOICE DIALOG';

export const GENERATE_PROFORMA_INVOICE = '[INVOICES APP] GENERATE PROFORMA INVOICE';
export const GENERATE_PROFORMA_INVOICE_PROGRESS = '[INVOICES APP] GENERATE PROFORMA INVOICE PROGRESS';
export const GENERATE_PROFORMA_INVOICE_ERROR = '[INVOICES APP] GENERATE PROFORMA INVOICE ERROR';
export const BANK_DETAILS_BY_BRANCH = '[INVOICES APP] BANK_DETAILS_BY_BRANCH'

export function generateProformaInvoice(data) {
  const request = axios.post(`/api/v1/invoices/generate_proforma`, data);
   
  return (dispatch) => {
    dispatch({ type: GENERATE_PROFORMA_INVOICE_PROGRESS })

    request.then((response) => {
      dispatch(showMessage({ message: 'Proforma Invoice generated successfully' }));

      Promise.all([
        dispatch({
          type: GENERATE_PROFORMA_INVOICE,
          payload: response.data.data,
        }),
      ]).then(() => {
        dispatch(Actions.openProformaInvoiceDialog(response.data.data))
        dispatch(Actions.getProformaInvoices());
        // history.push("/proforma")
      });    
    })
    .catch(err => {
      if(err.response && err.response.data){
        dispatch(showMessage({ message: 'Proforma Invoice failed to generate' }));
      }
      dispatch({ type: GENERATE_PROFORMA_INVOICE_ERROR })
    });
  };
}

export function getProformaInvoices(page=0, size=10) {
  const request = axios.get('/api/v1/invoices/proforma/all', { params: { page, size } });

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_PROFORMA_INVOICES,
        payload: response.data.data
      })
    );
}

export function getProformaInvoiceById(id) {
  const request = axios.get('/api/v1/invoices/proforma_id/' + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_PROFORMA_INVOICE_BY_ID,
        payload: response.data.data
      })
    );
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openProformaInvoiceDialog(payload) {
  return {
    type: OPEN_PROFORMA_INVOICE_DIALOG,
    payload
  };
}

export function closeProformaInvoiceDialog() {
  return {
    type: CLOSE_PROFORMA_INVOICE_DIALOG,
  };
}

export function getBankDetailsByBranch(payload) {
  const request = authServerAxios.get(`/api/v1/party/bank_account/${payload.branchId}`);
  return (dispatch) => {
    request
      .then(response => {
        dispatch({
          type: BANK_DETAILS_BY_BRANCH,
          payload: response.data,
        })
      }).catch(error => {
        if(error.response){
          
        }
      })
  };
}