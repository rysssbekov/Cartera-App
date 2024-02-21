import axios from 'axios'
import { accessGlobalUserState } from './stores/user'

export const UNIX_API_HOST = 'https://uni-x-api.kz'
export const CARTERA_API_HOST = 'https://csci3170.gdh.kz'

const makeRequest = async (method, url, apiHost, params, headers = {}) => {
    const apiUrl = `${apiHost}`
    //console.log('apiUrl: ', apiUrl)
    const userState = accessGlobalUserState().get()
    if(userState.token) {
      headers.Authorization = `Bearer ${userState.token}`
    } 
    const options = {
      url: `${apiUrl}${url}`,
      method,
      headers
    }
  
    if (method === 'get') {
      options.params = params
    } else {
      options.data = params
    }
  
    return axios(options)
}

const request =
  (method, url, apiHost) =>
  (...params) => {
    //console.log(method, url)

    return makeRequest(method, url, apiHost, ...params)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        if(error.response?.status === 401) {
          //logOut()
        }
        return Promise.reject(error)
      })
}

const unixRequest = (method, url) => request(method, url, UNIX_API_HOST)

const carteraRequest = (method, url) => request(method, url, CARTERA_API_HOST)

const userApi = {
    signIn: (body) => unixRequest('post', '/auth/login')(body),
    search: (query) => unixRequest('get', `/users/search?name=${query}`)(),
    orgAdmin: (body) => unixRequest('post', '/users/roles')(body),
    forgetPassword: (body) => unixRequest('post', '/auth/forget')(body)
}

const articlesApi = {
    all: () => carteraRequest('get', '/api/v1/articles/all')(),
    allEvents: () => carteraRequest('get', '/api/v1/cevents/all')()
}

export {
    userApi,
    articlesApi
}