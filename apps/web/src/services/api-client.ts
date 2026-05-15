import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL =
  typeof window !== 'undefined'
    ? '/api/v1'
    : process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1'

interface ApiErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
}

class ApiClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError<ApiErrorResponse>) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - clear session
          if (typeof window !== 'undefined') {
            // Redirect to login if needed
          }
        }
        return Promise.reject(error.response?.data || error.message || error)
      }
    )
  }

  // Auth endpoints
  async register(email: string, password: string, name: string) {
    return this.instance.post('/auth/register', { email, password, name })
  }

  async login(email: string, password: string) {
    return this.instance.post('/auth/login', { email, password })
  }

  async logout() {
    return this.instance.post('/auth/logout')
  }

  async refresh() {
    return this.instance.post('/auth/refresh')
  }

  // Profile endpoints
  async getProfile() {
    return this.instance.get('/profile')
  }

  // Business endpoints
  async createBusiness(data: any) {
    return this.instance.post('/business/create', data)
  }

  async getTenant() {
    return this.instance.get('/business/me')
  }

  // Admin endpoints
  async getAdminData() {
    return this.instance.get('/admin')
  }

  // Generic request methods
  get<T = any>(url: string, config?: any) {
    return this.instance.get<T, any>(url, config)
  }

  post<T = any>(url: string, data?: any, config?: any) {
    return this.instance.post<T, any>(url, data, config)
  }

  put<T = any>(url: string, data?: any, config?: any) {
    return this.instance.put<T, any>(url, data, config)
  }

  patch<T = any>(url: string, data?: any, config?: any) {
    return this.instance.patch<T, any>(url, data, config)
  }

  delete<T = any>(url: string, config?: any) {
    return this.instance.delete<T, any>(url, config)
  }
}

export const apiClient = new ApiClient()

