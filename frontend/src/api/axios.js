import axios from 'axios';
import config from '../config';

const instance = axios.create({
  baseURL: config.API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance; 