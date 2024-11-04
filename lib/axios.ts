// lib/axios.ts
import axios from 'axios'

const BASE_URL = 'https://discussionapi.goreeva.com/api/'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // important for cookies
  headers: {
    'Content-Type': 'application/json',
  }
})

// Response interceptor for handling 401s
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh token
        await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include'
        })

        // Retry original request
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance