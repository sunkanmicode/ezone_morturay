import axios from 'axios';
 

// export const homeUrl = /* "https://dev.ezoneerp.com/"*/ "https://apps.ezoneerp.com";
// 
// export const baseURL =   /*"https://dev.ezoneapps.com/gateway"*/ "https://api.ezoneerp.com/gateway";


export const homeUrl = "https://dev.ezoneerp.com/";

export const baseURL = "https://dev.ezoneapps.com/gateway";



export const mortuaryService = "/mortuary-service/";
export const authService = "/authserv";
export const authServerBaseURL = `${baseURL}${authService}`;

const token = localStorage.getItem('access_token')

export const authServerAxios = axios.create({
    baseURL: authServerBaseURL,
    headers: {
        Authorization: `Bearer ${token}`
    }
})
