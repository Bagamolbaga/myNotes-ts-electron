import axios, { AxiosRequestConfig } from 'axios'

const API = axios.create({
  baseURL: 'https://baga-my-notes-server-ts-v2.herokuapp.com'
})

const interceptor = (config: AxiosRequestConfig) => {
  config.headers!.authorization = `Bearer ${localStorage.getItem('my-notes-token')}`
  return config
}

API.interceptors.request.use(interceptor)

export { API }
