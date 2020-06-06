import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import './assets/iconfont/iconfont.css'
import MyCard from './components/Card.vue'
import MyListCard from './components/ListCard.vue'
import axios from 'axios'

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.component('mCard', MyCard)
Vue.component('mListcard', MyListCard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
