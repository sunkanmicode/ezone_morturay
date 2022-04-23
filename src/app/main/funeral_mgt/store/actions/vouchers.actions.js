import axios from 'axios';
import * as Actions from "./"
import { showMessage } from '../../../../../app/store/actions/fuse';
import history from "../../../../../@history"
import { authServerAxios } from '../../../../fuse-configs/baseURL';

export const GET_VOUCHERS = '[VOUCHERS APP] GET VOUCHERS';
export const GET_VOUCHER_BY_ID = '[VOUCHERS APP] GET VOUCHER BY ID';
export const SET_SEARCH_TEXT = '[VOUCHERS APP] SET SEARCH TEXT';

export const OPEN_VOUCHER_DIALOG = '[VOUCHERS APP] OPEN VOUCHER DIALOG';
export const CLOSE_VOUCHER_DIALOG = '[VOUCHERS APP] CLOSE VOUCHER DIALOG';

export const OPEN_EDIT_VOUCHER_DIALOG = '[VOUCHERS APP] OPEN EDIT VOUCHER DIALOG';
export const CLOSE_EDIT_VOUCHER_DIALOG = '[VOUCHERS APP] CLOSE EDIT VOUCHER DIALOG';

export const GENERATE_VOUCHER = '[VOUCHERS APP] GENERATE VOUCHER';
export const GENERATE_VOUCHER_PROGRESS = '[VOUCHERS APP] GENERATE VOUCHER PROGRESS';
export const GENERATE_VOUCHER_ERROR = '[VOUCHERS APP] GENERATE VOUCHER ERROR';

export const UPDATE_VOUCHER = '[VOUCHERS APP] UPDATE VOUCHER';

export const DELETE_VOUCHER = '[VOUCHERS APP] DELETE VOUCHER';


export const BANK_DETAILS_BY_BRANCH = '[VOUCHERS APP] BANK_DETAILS_BY_BRANCH'

export const GET_BRANCHES = '[VOUCHERS APP] GET BRANCHES'

export function generateVoucher(data) {
  const request = axios.post('/api/v1/vauchers', data);

  return (dispatch) => {
    dispatch({ type: GENERATE_VOUCHER_PROGRESS })

    request.then((response) => {
      dispatch(showMessage({ message: 'Voucher generated successfully' }));

      Promise.all([
        dispatch({
          type: GENERATE_VOUCHER,
          payload: response.data.data,
        }),
      ]).then(() => {
        dispatch(Actions.getVouchers());
        history.push("/vouchers")
      });    
    })
    .catch(err => {
      if(err.response && err.response.data){
        dispatch(showMessage({ message: 'Voucher failed to generate' }));
      }
      dispatch({ type: GENERATE_VOUCHER_ERROR })
    });
  };
}

export function getVouchers(page=0, size=10) {
  const request = axios.get('/api/v1/vauchers', { params: { page, size } });

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_VOUCHERS,
        payload: response.data.data
      })
    );
}

export function getVoucherById(id) {
  const request = axios.get('/api/v1/vauchers/' + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_VOUCHER_BY_ID,
        payload: response.data.data
      })
    );
}

export function updateVoucher(data, id) {
  const request = axios.put('/api/v1/vauchers/' + id, data);

  return (dispatch) => {
    dispatch({ type: GENERATE_VOUCHER_PROGRESS })

    request.then((response) => {
      dispatch(showMessage({ message: 'Voucher updated successfully' }));

      Promise.all([
        dispatch({
          type: UPDATE_VOUCHER,
          payload: response.data.data,
        }),
      ]).then(() => {
        dispatch(Actions.getVouchers());
        history.push("/vouchers")
      });    
    })
    .catch(err => {
      if(err.response && err.response.data){
        dispatch(showMessage({ message: 'Voucher failed to update' }));
      }
      dispatch({ type: GENERATE_VOUCHER_ERROR })
    });
  };
}

export function deleteVoucher(id) {
  const request = axios.delete('/api/v1/vauchers/' + id);

  return (dispatch) => {
    request.then((response) => {
      dispatch(showMessage({ message: 'Voucher deleted successfully' }));

      Promise.all([
        dispatch({
          type: DELETE_VOUCHER,
          payload: response.data.data,
        }),
      ]).then(() => {
        dispatch(Actions.getVouchers());
        history.push("/vouchers")
      });    
    })
    .catch(err => {
      if(err.response && err.response.data){
        dispatch(showMessage({ message: 'Voucher failed to delete' }));
      }
      dispatch({ type: GENERATE_VOUCHER_ERROR })
    });
  };
}




export function getBankDetailsByBranch(payload) {
  const request = authServerAxios({
    method: 'GET',
    url: `/api/v1/party/bank_account/${payload.branchId}`
  });
  return (dispatch) => {
    request
      .then(response => {
        dispatch({
          type: BANK_DETAILS_BY_BRANCH,
          payload: response.data,
        })

      }).catch(error => {
        if(error.response){
          return Promise.reject(error.response.data);
        }
      })
  };
}


export function getBranches({orgId}) {
  
  const request = authServerAxios.get(
    `/api/v1/organisation_and_tag/parties?tagId=1&orgId=${orgId}`
  );

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_BRANCHES,
        payload: response.data,
      });
    }).catch(error => {
      if(error.response){
        return Promise.reject(error.response.data);
      }
    })
}



export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openVoucherDialog(payload) {
  return {
    type: OPEN_VOUCHER_DIALOG,
    payload
  };
}

export function closeVoucherDialog() {
  return {
    type: CLOSE_VOUCHER_DIALOG,
  };
}

export function openEditVoucherDialog(payload) {
  return {
    type: OPEN_EDIT_VOUCHER_DIALOG,
    payload
  };
}

export function closeEditVoucherDialog() {
  return {
    type: CLOSE_EDIT_VOUCHER_DIALOG,
  };
}