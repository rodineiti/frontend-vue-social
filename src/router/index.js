import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home.vue'
import Login from '@/pages/login/Login.vue'
import Cadastro from '@/pages/cadastro/Cadastro.vue'
import Perfil from '@/pages/perfil/Perfil.vue'
import Pagina from '@/pages/pagina/Pagina.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: Cadastro
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
    },
    {
      path: '/pagina/:id/:nome?',
      name: 'Pagina',
      component: Pagina
    }
  ]
})
