import axios from 'axios';

// make base url for all axios requests
axios.defaults.baseURL = process.env.REACT_APP_API_URL_BASE;
