import axios from "axios";

const API_URL = "http://localhost:8080/api/gastos";

export const gastoService = {
    getAll: () => axios.get(API_URL),
    create: (gasto) => axios.post(API_URL, gasto),
    delete: (id) => axios.delete(`${API_URL}/${id}`)
};