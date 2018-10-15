import axios from 'axios'

export default {
  getActualReading: () => {
    return axios.get(`http://${__configs.eflowServer}/readings/actual`)
  }
}
