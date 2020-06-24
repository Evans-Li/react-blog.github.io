import axios from 'axios'

export const requestGet = (url)=>{
  return axios({
    method: 'get',
    url,
    withCredentials: true,
    // header: { 'Access-Control-Allow-Origin': '*' },
  })
}
export const requestPost = (url,data)=>{
  return axios({
    method: 'post',
    url,
    data,
    withCredentials: true,
    header: { 'Access-Control-Allow-Origin': '*' },
  })
}