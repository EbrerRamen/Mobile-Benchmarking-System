import axios from 'axios';

const API_BASE = 'http://localhost:1080/api'; // your Express base URL

export const getPhones = async () => {
  return axios.get(`${API_BASE}/phones`);
};

export const addPhone = async (phoneData) => {
  return axios.post(`${API_BASE}/phones/add`, phoneData);
};

export const updatePhone = async (id, phoneData) => {
  return axios.put(`${API_BASE}/phones/phones/${id}`, phoneData);
};

export const deletePhone = async (id) => {
  return axios.delete(`${API_BASE}/phones/phones/${id}`);
};
