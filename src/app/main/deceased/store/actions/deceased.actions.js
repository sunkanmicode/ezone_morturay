import axios from 'axios';
import { showMessage } from '../../../../store/actions/fuse';
import * as Actions from '.';
import history from '../../../../../@history';
import { authServerAxios } from '../../../../fuse-configs/baseURL';

export const CREATE_DECEASED = '[DECEASED APP] CREATE DECEASED';
export const UPDATE_DECEASED = '[DECEASED APP] UPDATE DECEASED';
export const GET_ALL_DECEASED = '[DECEASED APP] GET ALL DECEASED';
export const GET_DECEASED_BY_ID = '[DECEASED APP] GET DECEASED BY ID';

export const PRINT_ADMISSION_FORM = '[DECEASED APP] PRINT ADMISSION FORM';
export const PRINT_EMBALMMENT_CERTIFICATE =
  '[DECEASED APP] PRINT EMBALMMENT CERTIFICATE';
export const PRINT_CREMATION_CERTIFICATE =
  '[DECEASED APP] PRINT CREMATION CERTIFICATE';

  //open released from dialog
export const OPEN_RELEASE_FORM_DIALOG =
  '[DECEASED APP] OPEN RELEASE FORM DIALOG';
export const CLOSE_RELEASE_FORM_DIALOG =
  '[DECEASED APP] CLOSE RELEASE FORM DIALOG';

  // All Released forms
export const ADD_RELEASE_FORM = '[DECEASED APP] ADD RELEASE FORM';
export const GET_RELEASED_FORMS = '[DECEASED APP] GET RELEASED FORMS';
export const GET_RELEASED_FORM_BY_ID = '[DECEASED APP] GET_RELEASED_FORM_BY_ID'
export const GET_RELEASED_FORM_BY_DECEASED_ID = "[DECEASED APP] GET_RELEASED_FORM_BY_DECEASED_ID;";


//Add Deceased Documents
export const OPEN_ADD_DECEASED_DOCUMENTS =
  "[DECEASED APP] OPEN_ADD_DECEASED_DOCUMENTS";
export const CLOSE_ADD_DECEASED_DOCUMENTS =
  "[DECEASED APP] CLOSE_ADD_DECEASED_DOCUMENTS";


export const SET_PROGRESS = '[DECEASED APP] SET PROGRESS';

export const SET_SEARCH_TEXT = '[DECEASED APP] SET SEARCH TEXT';

export const BANK_DETAILS_BY_BRANCH = '[DECEASED APP] BANK_DETAILS_BY_BRANCH'

export const STOP_PROGRESS = '[DECEASED APP] STOP PROGRESS'

export const GET_BRANCHES = '[DECEASED APP] GET BRANCHES'

export const DECEASED_OTHER_DOCUMENTS = '[DECEASED APP] DECEASED_OTHER_DOCUMENTS'


export function createDeceased(data) {
  const request = axios.post('/api/v1/deceased', data);
  // console.log(request, 'creating deceased request');

  return (dispatch) => {
    dispatch({ type: SET_PROGRESS });

    request
      .then((response) => {
        dispatch(showMessage({ message: 'Deceased created successfully' }));

        Promise.all([
          dispatch({
            type: CREATE_DECEASED,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getAllDeceased());
          history.push('/deceased');
        });
      })
      .catch((err) => {
        dispatch(showMessage({ message: 'Deceased creation failed' }));
      });
  };
}

export function addReleaseForm(data, id) {
  const request = axios.post(
    `/api/v1/forms/deceased_id/${id}/release_form`,
    data
  );
  return (dispatch) => {
    dispatch({ type: SET_PROGRESS });

    request
      .then((response) => {
        console.log(response, 'resReleaseForm9')
        console.log(response.data, 'resRelease')
        dispatch(
          showMessage({ message: 'Corpse release form created successfully' })
        );
        Promise.all([
          dispatch({
            type: ADD_RELEASE_FORM,
            payload: response.data.data,
          }),
        ]).then(() => {
          dispatch(Actions.getAllDeceased());
          dispatch(Actions.openReleaseFormDialog(response.data.data));
          history.push(`/deceased/${id}`);
        });
      })
      .catch((err) => {
        if(err.response){

         if(/{/.test(err?.response?.data?.message)){
           dispatch(
            showMessage({ message: err?.response?.data?.message?.split('{')[1].split('}')[0]})
          );
         }else {
          var patt = new RegExp("Release Form has been created for this deceased");
           if(patt.test(err?.response?.data?.message)){
            dispatch(
              showMessage({ message: 'Release form was previously created, corpse has been released'})
            );
           }else{
            dispatch(
              showMessage({ message: err?.response?.data?.message})
            );
           }
         
         }
         /*  dispatch(
            showMessage({ message: err?.response?.data?.message?.split('{')[1].split('}')[0]})
          ); */
          dispatch({
            type: STOP_PROGRESS
          });
        }
        
       
      });
  };
}

//add deceased other documents
export function addDocumentToDeceased(data, id) {
  const request = axios.post("/api/v1/deceased/add-other-documents", data);
  return (dispatch) => {
    dispatch({ type: SET_PROGRESS });
    request
      .then((response) => {
        dispatch(showMessage({ message: "Documents added successfully" }));
       
        Promise.all([
          dispatch({
            type: DECEASED_OTHER_DOCUMENTS,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getAllDeceased());
          // dispatch(Actions.getDeceasedById(id));
          window.location.reload();
          history.push("/deceased");
        });
      })
      .catch((err) => {
        dispatch(showMessage({ message: "Documents uploaded failed" }));
      });
  };
}




export function getAllDeceased(page = 0, size = 50) {
  const request = axios.get('/api/v1/deceased', { params: { page, size } });

  return (dispatch) =>
    request.then((response) => {
      // console.log(response, 'decRes')
      dispatch({
        type: GET_ALL_DECEASED,
        payload: response.data.data,
      });
    });
}

export function getDeceasedById(id) {
  const request = axios.get('/api/v1/deceased/' + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_DECEASED_BY_ID,
        payload: response.data.data,
      })
    );
}

export function printAdmissionForm(id) {
  const request = axios.get(
    `/api/v1/forms/deceased_id/${id}/print_admission_form`
  );

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: PRINT_ADMISSION_FORM,
        payload: response.data.data,
      })
    );
}

export function printEmbalmmentCertificate(id) {
  const request = axios.get(
    `/api/v1/forms/deceased_id/${id}/print_embalming_certificate`
  );

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: PRINT_EMBALMMENT_CERTIFICATE,
        payload: response.data.data,
      })
    );
}

export function printCremationCertificate(id) {
  const request = axios.get(
    `/api/v1/forms/deceased_id/${id}/print_cremation_certificate`
  );

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: PRINT_CREMATION_CERTIFICATE,
        payload: response.data.data,
      })
    );
}

// Get all Released Form api
export function getReleasedForms(page = 0, size = 10) {
  const request = axios.get("/api/v1/forms/release_forms", {
    params: { page, size },  
  });

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_RELEASED_FORMS,
        payload: response.data.data,
      });
    });
}

// Get Released form by id
export function getReleasedFormById(id) {
  const request = axios.get(`/api/v1/forms/release_form_id/${id}`);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_RELEASED_FORM_BY_ID,
        payload: response.data.data,
      })
    );
}
export function getReleasedByDeceased_id(id) {
  const request = axios.get(`/api/v1/forms/release_form/deceased_id/${id}`);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_RELEASED_FORM_BY_DECEASED_ID,
        payload: response.data.data,
      })
    );
}



export function updateDeceased(data) {
  const request = axios.put('/api/v1/deceased', data);

  return (dispatch) => {
    dispatch({ type: SET_PROGRESS });
    request
      .then((response) => {
        dispatch(showMessage({ message: 'Deceased updated successfully' }));

        Promise.all([
          dispatch({
            type: UPDATE_DECEASED,
            payload: response.data,
          }),
        ]).then(() => dispatch(Actions.getAllDeceased()));
      })
      .catch((err) => {
        dispatch(showMessage({ message: 'Deceased update failed' }));
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

// Open and Close Add Deceased Documents
export function openAddDceasedDocuments(payload) {
  return {
    type: OPEN_ADD_DECEASED_DOCUMENTS,
    payload,
  };
}

export function closeAddDceasedDocuments(payload) {
  return {
    type: CLOSE_ADD_DECEASED_DOCUMENTS,
    payload,
  };
}


// Open and Close Release Form Dialog
export function openReleaseFormDialog(payload) {
  return {
    type: OPEN_RELEASE_FORM_DIALOG,
    payload,
  };
}

export function closeReleaseFormDialog() {
  return {
    type: CLOSE_RELEASE_FORM_DIALOG,
  };
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}
