import axios from 'axios';
import { authServerAxios } from '../../../../fuse-configs/baseURL';

export const GET_BANKS = '[SETTINGS APP] GET_BANKS';
export const GET_BANKS_ERROR = '[SETTINGS APP] GET_BANKS_ERROR';
export const GET_BANK_DETAILS_BY_BRANCH = '[SETTINGS APP] GET_BANK_DETAILS_BY_BRANCH'

export function getBanks() {
  const request = authServerAxios.get(`/authserv/api/v1/banks`);
  return (dispatch) => {
    request
      .then((response) => {
        console.log(response, 'banks response');
        dispatch({
          type: GET_BANKS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({ type: GET_BANKS_ERROR });
      });
  };
}


