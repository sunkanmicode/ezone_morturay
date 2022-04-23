import axios from 'axios';
import { showMessage } from '../../../../../app/store/actions/fuse';
import * as Actions from './';
import history from '../../../../../@history';
import { authServerAxios } from '../../../../fuse-configs/baseURL';

export const CREATE_CUSTOMER = '[CUSTOMER APP] CREATE CUSTOMER';
export const CREATE_CUSTOMER_ERROR = '[CUSTOMER APP] CREATE CUSTOMER ERROR';
export const CREATE_CUSTOMER_PROGRESS =
  '[CUSTOMER APP] CREATE CUSTOMER PROGRESS';

export const CREATE_RETURNING_CUSTOMER =
  '[CUSTOMER APP] CREATE RETURNING CUSTOMER';

export const UPDATE_CUSTOMER = '[CUSTOMER APP] UPDATE CUSTOMER';
export const UPDATE_CUSTOMER_ERROR = '[CUSTOMER APP] UPDATE CUSTOMER ERROR';

export const GET_CUSTOMERS = '[CUSTOMER APP] GET CUSTOMERS';
export const GET_CUSTOMER_BY_ID = '[CUSTOMER APP] GET CUSTOMER BY ID';

export const SET_SEARCH_TEXT = '[CUSTOMER APP] SET SEARCH TEXT';

export const OPEN_EDIT_CUSTOMER_DIALOG =
  '[CUSTOMER APP] OPEN EDIT CUSTOMER DIALOG';
export const CLOSE_EDIT_CUSTOMER_DIALOG =
  '[CUSTOMER APP] CLOSE EDIT CUSTOMER DIALOG';



export const GET_DECEASED_BY_CUSTOMER = 'GET_DECEASED_BY_CUSTOMER';

  export const GET_BRANCHES = '[CUSTOMER APP] GET BRANCHES'


export function createCustomer(data) {
 
  const request = axios.post('/api/v1/customers', data);
  
  return async (dispatch) => {
    dispatch({ type: CREATE_CUSTOMER_PROGRESS });

    await request
      .then((response) => {
        dispatch(showMessage({ message: 'Customer created successfully' }));

        Promise.all([
          dispatch({
            type: CREATE_CUSTOMER,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getCustomers());
          history.push('/customers');
        });
      })
      .catch((err) => {
        console.log(err.response.data.details.toString(), 'RIGHT HERE');
        if (err?.response && err.response?.data) {
          dispatch(showMessage({ message: err.response.data.details.toString() }));
          dispatch({ type: CREATE_CUSTOMER_ERROR, payload: err.response.data.details.toString() });
        }
       
      });
  };
}

export function createReturningCustomer(data, id) {
  const request = axios.post(
    `/api/v1/customers/customer_id/${id}/request_service`,
    data
  );
  console.log(data, 'requestRetData')
  return (dispatch) => {
    dispatch({ type: CREATE_CUSTOMER_PROGRESS });
    request
      .then((response) => {
        dispatch(showMessage({ message: 'Services requested successfully' })); 
        Promise.all([
          dispatch({
            type: CREATE_RETURNING_CUSTOMER,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getCustomers());
          history.push('/customers');
        });
      })
      .catch((err) => {
        console.log('HERE@@', err?.response)
        dispatch(showMessage({ message: 'Services request failed' }));
        dispatch({ type: CREATE_CUSTOMER_ERROR, payload: err?.response });
      });
  };
}

export function getCustomers(page = 0, size = 50) {
  const request = axios.get('/api/v1/customers', { params: { page, size } });

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_CUSTOMERS,
        payload: response.data.data,
      });
    });
}

export function getCustomerById(id) {
  const request = axios.get('/api/v1/customers/' + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_CUSTOMER_BY_ID,
        payload: response.data.data,
      })
    );
}

export function updateCustomer(customer_id, data) {
  const request = axios.put(`/api/v1/customers/${customer_id}`, data);

  return (dispatch) => {
    dispatch({ type: CREATE_CUSTOMER_PROGRESS });

    request
      .then((response) => {
        dispatch(showMessage({ message: 'Customer updated successfully' }));

        Promise.all([
          dispatch({
            type: UPDATE_CUSTOMER,
            payload: response.data,
          }),
        ]).then(() => {
          history.push(`/customers/${customer_id}`);
          dispatch(Actions.closeEditCustomerDialog());
          window.location.reload();
        });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_CUSTOMER_ERROR, payload: err?.response });
      });
  };
}


export function getDeceasedByCustomer(customer_id){
  const request = axios.get(`/api/v1/customers/customer_deceased/${customer_id}/deceases`);

  return (dispatch) =>
    request.then((response) =>{
       return dispatch({
        type: GET_DECEASED_BY_CUSTOMER,
        payload: response.data.data,
      })}
    );
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

export function openEditCustomerDialog(payload) {
  return {
    type: OPEN_EDIT_CUSTOMER_DIALOG,
    payload,
  };
}

export function closeEditCustomerDialog() {
  return {
    type: CLOSE_EDIT_CUSTOMER_DIALOG,
  };
}


