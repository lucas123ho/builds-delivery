import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: `${config.baseURL}/store/${config.store_id}`
});

export default api;
