import axios from 'axios';
import store from 'app/store';
import { showMessage } from '../fuse';
import { baseURL } from 'app/fuse-configs/baseURL';

export const GET_BRANCHES = '[EZONE APP] GET BRANCHES';
export const UPDATE_BRANCH = '[EZONE APP] UPDATE BRANCH';
export const UPDATE_BRANCH_ERROR = '[EZONE APP] UPDATE BRANCH ERROR';

export const LOADING_PROGRESS = '[EZONE APP] LOADING PROGRESS';

export const GET_BRANCH_BY_ID = '[EZONE APP] GET BRANCH BY ID';

export function getBranches() {
  const user = store.getState().auth.user.data;
  console.log(user, 'getState', user.organisation?.id );
  if(user.organisation?.id){
    localStorage.orgId = user.organisation?.id 
  }
  
  console.log({orgIdX: user.organisation?.id || localStorage.orgId})
  const request = axios.get(
    `${baseURL}/authserv/api/v1/organisation_and_tag/parties?tagId=1&orgId=${user.organisation?.id || localStorage.orgId}`
  );

  console.log({orgId: user.organisation?.id ?? localStorage.orgId, request})

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_BRANCHES,
        payload: response.data,
      });
    });
}

export function getBranchById(id) {
  const request = axios.get(`${baseURL}/authserv/api/v1/party/get_by_id/${id}`);

  console.log(request, 'request');

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_BRANCH_BY_ID,
        payload: response.data,
      });
    });
}

export function updateBranch(data) {
  const request = axios.post(
    `${baseURL}/authserv/api/v1/party/bank_account`,
    data
  );

  console.log(request, 'request');

  return (dispatch) => {
    dispatch({ type: LOADING_PROGRESS });

    request
      .then((response) => {
        Promise.all([
          dispatch({
            type: UPDATE_BRANCH,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(showMessage({ message: 'Branch was updated successfully' }));
        });
      })
      .catch((err) => {
        console.dir(err);
        dispatch(showMessage({ message: err.response?.data?.message }));
      });
  };
}
