import axios from 'axios';
import moment from 'moment';

export const GET_ADMISSION_REPORT = '[CUSTOMER APP] GET ADMISSION REPORT';
export const GET_CREMATION_REPORT = '[CUSTOMER APP] GET CREMATION REPORT';
export const GET_VAULT_REPORT = '[CUSTOMER APP] GET VAULT REPORT';
export const GET_VOUCHER_REPORT = '[CUSTOMER APP] GET VOUCHER REPORT';
export const GET_RELEASE_REPORT = '[CUSTOMER APP] GET RELEASE REPORT';

export const FETCH_PROGRESS = '[CUSTOMER APP] FETCH PROGRESS';
export const FETCH_REPORT_ERROR = '[CUSTOMER APP] FETCH REPORT ERROR';

export const SET_SEARCH_TEXT = '[CUSTOMER APP] SET SEARCH TEXT';
export const SET_FORM = '[CUSTOMER APP] SET FORM';

export function getAdmissionReports(data) {
  return (dispatch, getState) => {
    const user = getState().auth.user.data;
    data.orgKey = user.organisation.orgId;

    const request = axios.post('/api/v1/reports/admission-form', data);
    dispatch({ type: FETCH_PROGRESS });

    request
      .then((response) => {
        console.log(response, 'admission reports response');
        dispatch({
          type: GET_ADMISSION_REPORT,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_REPORT_ERROR });
      });
  };
}

export function getCremationReports(data) {
  return (dispatch, getState) => {
    const user = getState().auth.user.data;
    data.orgKey = user.organisation.orgId;

    const request = axios.post('/api/v1/reports/cremation-form', data);
    dispatch({ type: FETCH_PROGRESS });

    request
      .then((response) => {
        console.log(response, 'cremation reports response');
        dispatch({
          type: GET_CREMATION_REPORT,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_REPORT_ERROR });
      });
  };
}

export function getVaultReports(data) {
  return (dispatch, getState) => {
    const user = getState().auth.user.data;
    data.orgKey = user.organisation.orgId;

    const request = axios.post('/api/v1/reports/vault-form', data);
    dispatch({ type: FETCH_PROGRESS });

    request
      .then((response) => {
        console.log(response, 'vault reports response');
        dispatch({
          type: GET_VAULT_REPORT,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_REPORT_ERROR });
      });
  };
}

export function getVoucherReports(data) {
  return (dispatch, getState) => {
    const user = getState().auth.user.data;
    data.orgKey = user.organisation.orgId;

    const request = axios.post('/api/v1/reports/voucher-form', data);
    dispatch({ type: FETCH_PROGRESS });

    request
      .then((response) => {
        console.log(response, 'voucher reports response');
        dispatch({
          type: GET_VOUCHER_REPORT,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_REPORT_ERROR });
      });
  };
}

export function getReleaseReports() {
  const request = axios.get('/api/v1/forms/release_forms');

  return (dispatch) => {
    dispatch({ type: FETCH_PROGRESS });

    request
      .then((response) => {
        console.log(response, 'release reports response');
        dispatch({
          type: GET_RELEASE_REPORT,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_REPORT_ERROR });
      });
  };
}

export function setForm(event) {
  console.log(event.target.name, 'name');
  console.log(event.target.value, 'value');
  return {
    type: SET_FORM,
    name: event.target.name,
    value: event.target.value,
  };
}

export function setFormDate(name, date) {
  return {
    type: SET_FORM,
    name: name,
    value: moment(date).format('YYYY-MM-DDTHH:mm:ss'),
  };
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}
