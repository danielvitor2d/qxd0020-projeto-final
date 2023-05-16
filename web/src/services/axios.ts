import axios from 'axios'
import { useAuthStore } from '../stores/authStore';

export const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
