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
    },
    {
      path:'/user/:userId',
      name:'user',
      component:()=>import('../views/user/User.vue'),
      props:true
    }
   
  ]
})

export default router
