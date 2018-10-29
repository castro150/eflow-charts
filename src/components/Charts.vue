<template>
  <div id="charts">
    <div id="wrapper">
      <div id="consumption"><apexcharts width="500" type="bar" :options="barOptions" :series="barSeries"></apexcharts></div>
      <div id="flow"><apexcharts width="500" type="radialBar" :options="radialOptions" :series="[0]"></apexcharts></div>
    </div>
    <div>
      <button @click="updateChart">Update</button>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import http from '../services/http'

export default {
  name: 'Charts',

  components: {
    apexcharts: VueApexCharts
  },

  data: function () {
    return {
      barOptions: {
        chart: {
          id: 'vuechart-example'
        },
        colors: ['#008FFB'],
        xaxis: {
          categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        }
      },

      radialOptions: {
        chart: {
          id: 'vuechart-example2'
        },
        plotOptions: {
          radialBar: {
            track: {
              background: '#DDD'
            },
            dataLabels: {
              showOn: 'always',
              name: {
                offsetY: +25,
                show: true,
                color: '#111',
                fontSize: '36px'
              },
              value: {
                formatter: function () {
                  return 'Vazão'
                },
                offsetY: -25,
                color: '#888',
                fontSize: '17px',
                show: true
              }
            }
          }
        },
        labels: ['0 L/min']
      },

      barSeries: [{
        name: 'Consumo (L)',
        data: [30, 41, 37, 52, 49, 42, 38, 61, 59, 53, 47, 12]
      }]
    }
  },

  created () {
    this.updateFlow()
    setInterval(this.updateFlow, 5000)
  },

  methods: {
    updateChart () {
      const max = 90
      const min = 20
      const newData = this.barSeries[0].data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min
      })

      // In the same way, update the series option
      this.barSeries = [{
        data: newData
      }]

      // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
      this.radialOptions = {
        labels: [`${Math.floor(Math.random() * 10) + 1} L/min`]
      }
    },

    updateFlow () {
      http.getActualReading().then(res => {
        this.radialOptions = {
          labels: [`${res.data.flow.toFixed(2)} L/min`]
        }
      }).catch(err => {
        console.error(`Actual reading request error: ${err}`)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#charts {
  margin-left: 10vw;
  margin-right: 10vw;
}

#wrapper {
  margin: 0 auto;
}

#consumption {
  float: left;
}

#flow {
  float: right;
}
</style>
