import axios from 'axios'
// import {config} from '../config'

class HTTP {
  request(url, data, method = 'GET') {
    return new Promise((resolve, reject) => {
      axios({
        url,
        data,
        method
      }).then(res => {
        if (res.status === 200) {
          resolve(res.data)
        }
        reject()
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default HTTP
