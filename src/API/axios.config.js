import axios from 'axios';

export const API_URL_BASE = 'http://localhost:6060';

// make base url for all axios requests
axios.defaults.baseURL =  API_URL_BASE;
