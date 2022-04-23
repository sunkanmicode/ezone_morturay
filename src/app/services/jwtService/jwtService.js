import axios from 'axios';
import { homeUrl, authServerAxios } from 'app/fuse-configs/baseURL';
import { baseURL } from '../../fuse-configs/baseURL'
import FuseUtils from '@fuse/FuseUtils';

class jwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response?.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    let access_token = this.getAccessToken();
    console.log(access_token, 'just before handle authentication');

    if (!access_token) {
      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      console.log(access_token, 'access_token');
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/register', data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (
    username,
    password,
    grant_type = 'password'
  ) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/authserv/oauth/token', { username, password, grant_type })
        .then((response) => {
          if (response.data) {
            this.setSession(response.data.access_token);
            const user = this.getProfileData();
            resolve(user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/auth/access-token', {
          data: {
            access_token: this.getAccessToken(),
          },
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data.user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  updateUserData = (user) => {
    return axios.post('/api/auth/user/update', {
      user: user,
    });
  };

  getProfileData = () => {
    return new Promise((resolve, reject) => {
      authServerAxios.get(`/api/v1/users/profile`).then((response) => {
        console.log(response, 'response');
        resolve(response.data);
      });
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('access_token', access_token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    } else {
      localStorage.removeItem('access_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  logout = () => {
    return new Promise(async (resolve, reject) => {
      await authServerAxios.post(`/api/v1/logout`).then((response) => {
        console.log(response.data, 'logout response');
        window.location.replace(homeUrl);
        resolve(response.data);
        this.setSession(null);
      });
    });
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    return true;
    // const decoded = jwtDecode(access_token);
    // const currentTime = Date.now() / 1000;
    // if ( decoded.exp < currentTime )
    // {
    //     console.warn('access token expired');
    //     return false;
    // }
    // else
    // {
    //     return true;
    // }
  };

  getAccessToken = () => {
    return window.localStorage.getItem('access_token');
  };
}

const instance = new jwtService();

export default instance;
