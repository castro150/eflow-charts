import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

global.__configs = {
  eflowServer: process.env.EFLOW_SERVER || 'localhost:3000'
}

new Vue({
  render: h => h(App)
}).$mount('#app')
