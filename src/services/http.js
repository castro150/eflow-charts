import axios from 'axios'

export default {
  getActualReading () {
    return axios.get(`http://${__configs.eflowServer}/readings/actual`)
  },

  getConsumptionHistory () {
    return axios.get(`http://${__configs.eflowServer}/readings/history`)
      .then(response => {
        return response.data.map(history => {
          return {
            month: history._id.month,
            totalConsumption: history.totalConsumption
          }
        }).sort((first, second) => (first.month > second.month) ? 1 : -1)
      })
  }
}
