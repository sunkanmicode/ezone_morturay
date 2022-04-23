import axios from 'axios';
import { baseURL } from 'app/fuse-configs/baseURL';

export const GET_EMPLOYEES = '[EZONE APP] GET EMPLOYEES';

export function getEmployees() {
  return (dispatch, getState) => {
    const user = getState().auth.user;

    const request = axios.get(
      `${baseURL}/authserv/api/v1/users/get_by_orgid/${user.data.organisation.orgId}`
    );

    request.then((response) => {
      dispatch({
        type: GET_EMPLOYEES,
        payload: response.data,
      });
    });
  };
}
