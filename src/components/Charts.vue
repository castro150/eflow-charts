<template>
  <div>
    <apexcharts width="500" type="bar" :options="barOptions" :series="barSeries"></apexcharts>
    <apexcharts width="500" type="radialBar" :options="radialOptions" :series="[0]"></apexcharts>
    <div>
      <button @click="updateChart">Update</button>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

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
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
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
                offsetY: +27,
                show: true,
                color: '#111',
                fontSize: '36px'
              },
              value: {
                formatter: function () {
                  return 'Fluxo'
                },
                offsetY: -27,
                color: '#888',
                fontSize: '17px',
                show: true
              }
            }
          }
        },
        labels: ['0 L/s']
      },

      barSeries: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
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
        labels: [`${Math.floor(Math.random() * 10) + 1} L/s`]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
