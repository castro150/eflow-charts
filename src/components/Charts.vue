<template>
  <div id="charts">
    <div id="wrapper">
      <div id="consumption"><apexcharts width="500" type="bar" :options="barOptions" :series="barSeries"></apexcharts></div>
      <div id="flow"><apexcharts width="500" type="radialBar" :options="radialOptions" :series="[0]"></apexcharts></div>
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
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }]
    }
  },

  created () {
    this.updateFlow()
    this.updateBars()
    setInterval(this.updateFlow, 5000)
    setInterval(this.updateBars, 5000)
  },

  methods: {
    updateBars () {
      http.getConsumptionHistory()
        .then(history => {
          let newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          if (history.length >= 0) {
            newData[history[0].month] = +(history[0].totalConsumption.toFixed(1))
            for (let index = 1; index < history.length; index++) {
              let actual = history[index].totalConsumption
              let before = history[index - 1].totalConsumption
              newData[history[index].month] = +((actual - before).toFixed(1))
            }
          }
          this.barSeries = [{
            name: 'Consumo (L)',
            data: newData
          }]
        })
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
