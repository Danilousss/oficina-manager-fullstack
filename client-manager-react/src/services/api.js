import axios from 'axios'

const API_URL = "http://localhost:8080/api/clients";

export const clientService = {
    getAll: () => axios.get(API_URL),
    search: (type, term) => axios.get(`${API_URL}/search?${type}=${term}`),
    create: (data) => axios.post(API_URL, data),
    update: (id, data) => axios.put(`${API_URL}/${id}`,data),
    delete: (id) => axios.delete(`${API_URL}/${id}`)
};