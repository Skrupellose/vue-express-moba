import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/', component: () => import('../views/Home.vue')
      },
      {
        path: '/articles/:id', component: () => import('../views/Article.vue'), props: true
      }
    ]
  },
  {
    path: '/hero/:id',
    component: () => import('../views/Hero.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
