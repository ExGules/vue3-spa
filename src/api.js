import axios from 'axios';

const API_URL = 'http://109.73.206.144:6969/api';
const API_KEY = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
  },
});

export default api; 