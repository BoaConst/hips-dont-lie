import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export function getUsers() {
  return axios.get(`${API_URL}/v1/users`);
}