import axios, { AxiosRequestConfig } from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/'
})

const interceptor = (config: AxiosRequestConfig) => {
  config.headers!.authorization = `Bearer ${localStorage.getItem('my-notes-token')}`
  return config
}

API.interceptors.request.use(interceptor)

export { API }
