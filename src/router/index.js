import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../views/indexPage/IndexPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexPage
    },
    {
      path:'/about',
      name:'about',
      component:()=> import('../views/about/AboutPage.vue')
    }
   
  ]
})

export default router
