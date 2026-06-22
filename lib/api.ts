import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ========== PROPERTY APIs ==========
// export const propertyAPI = {
//   getAll: (params?: any) => api.get('/properties', { params }),
//   getFeatured: () => api.get('/properties/featured'),
//   getById: (id: number) => api.get(`/properties/${id}`),
//   create: (data: any) => api.post('/properties', data),
//   update: (id: number, data: any) => api.put(`/properties/${id}`, data),
//   delete: (id: number) => api.delete(`/properties/${id}`),
// };

// ========== INQUIRY APIs ==========
export const inquiryAPI = {
  getAll: () => api.get('/inquiries'),
  getById: (id: number) => api.get(`/inquiries/${id}`),
  create: (data: any) => api.post('/inquiries', data),
  markAsRead: (id: number) => api.put(`/inquiries/${id}/read`, {}),
  delete: (id: number) => api.delete(`/inquiries/${id}`),
};

// ========== AGENT APIs ==========
export const agentAPI = {
  getAll: () => api.get('/agents'),
  getById: (id: number) => api.get(`/agents/${id}`),
  create: (data: any) => api.post('/agents', data),
  update: (id: number, data: any) => api.put(`/agents/${id}`, data),
  delete: (id: number) => api.delete(`/agents/${id}`),
};

// ========== AUTH APIs ==========
export const authAPI = {
  login: (email: string, password: string) => api.post('/login', { email, password }),
  logout: () => api.post('/logout'),
  user: () => api.get('/user'),
};

export const propertyAPI = {
  getAll: (params?: any) => api.get('/properties', { params }),
  getFeatured: () => api.get('/properties/featured'),
  getById: (id: number) => api.get(`/properties/${id}`),  // ✅ This should exist
  create: (data: any) => api.post('/properties', data),
  update: (id: number, data: any) => api.put(`/properties/${id}`, data),
  delete: (id: number) => api.delete(`/properties/${id}`),
};


export default api;