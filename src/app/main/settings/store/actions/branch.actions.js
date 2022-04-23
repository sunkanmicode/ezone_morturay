import axios from 'axios';
import { authServerAxios } from '../../../../fuse-configs/baseURL';

export const OPEN_BRANCH_DIALOG = '[VOUCHERS APP] OPEN BRANCH DIALOG';
export const CLOSE_BRANCH_DIALOG = '[VOUCHERS APP] CLOSE BRANCH DIALOG';

export function openBranchDialog(id) {
  const request = authServerAxios.get(`/authserv/api/v1/party/get_by_id/${id}`);

  console.log(request, 'request');

  return (dispatch) =>
    request.then((response) => {
      console.log(response.data, 'response.data');
      dispatch({
        type: OPEN_BRANCH_DIALOG,
        payload: response.data,
      });
    });
}

export function closeBranchDialog() {
  return {
    type: CLOSE_BRANCH_DIALOG,
  };
}
