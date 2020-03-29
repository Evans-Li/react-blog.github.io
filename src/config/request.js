import axios from 'axios'

export const requestGet = (url,data)=>{
  return axios({
    method: 'get',
    url: url,
    data: data,
    withCredentials: true,
    // header: { 'Access-Control-Allow-Origin': '*' },
  })
}
export const requestPost = (url,data)=>{
  return axios({
    method: 'post',
    url: url,
    data: data,
    withCredentials: true,
    header: { 'Access-Control-Allow-Origin': 'http://localhost:3000' },
  })
}