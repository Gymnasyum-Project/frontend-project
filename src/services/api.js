import axios from "axios";

const api = axios.create({
    
    baseURL: import.meta.env.VITE_API_BASE_URL,
    Headers:{"Content-Type": "application/json"}
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if(token) config.Headers.Authorization = `Bearer ${token}`;
    return config
})
export default api