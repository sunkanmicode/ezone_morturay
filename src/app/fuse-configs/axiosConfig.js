
import axios from "axios";
import { baseURL, mortuaryService } from './baseURL'

const token = localStorage.getItem('access_token')

axios.defaults.baseURL = baseURL + mortuaryService;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';