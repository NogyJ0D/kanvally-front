import axios from 'axios'
import { URL } from '../config'

const instance = axios.create({
  baseURL: URL
})

const get = url => {
  return instance.get(url, { withCredentials: true })
    .then(res => { return res })
    .catch(err => { return err.response.data })
}

const post = (url, data) => {
  return instance.post(url, data, { withCredentials: true })
    .then(res => { return res })
    .catch(err => { return err.response.data })
}

const put = (url, data) => {
  return instance.put(url, data, { withCredentials: true })
    .then(res => { return res })
    .catch(err => { return err.response.data })
}

export default instance
export { get, post, put }
