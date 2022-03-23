import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000'
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

export default instance
export { get, post }
