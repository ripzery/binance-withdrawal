import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export default function initAxios(baseURL: string, headers: AxiosRequestConfig['headers']) : AxiosInstance {
  return Axios.create({ baseURL, headers })
}
