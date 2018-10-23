import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

global.__configs = {
  eflowServer: 'eflow-server.herokuapp.com'
}

new Vue({
  render: h => h(App)
}).$mount('#app')
