// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue, { h } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import slug from 'slug'
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$urlApi = 'https://rdndeveloper.com/backend'
Vue.prototype.$slug = slug

var store = {
	state: {
		usuarioToken: sessionStorage.getItem('usuario') ? JSON.parse(sessionStorage.getItem('usuario')) : null,
		conteudosLinhaTempo: []
	},
	getters: {
		getUsuarioToken: state => {
			return state.usuarioToken ? state.usuarioToken.access_token : null
		},
		getConteudoLinhaTempo: state => {
			return state.conteudosLinhaTempo
		}
	},
	mutations: {
		setUsuarioToken(state, token) {
			state.usuarioToken = token
		},
		setConteudoLinhaTempo(state, n) {
			console.log(n)
			state.conteudosLinhaTempo = n
		},
		setPaginacaoConteudosLinhaTempo(state, lista) {
			for (let item of lista) {
				state.conteudosLinhaTempo.push(item);
			}
		}
	}
}

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: new Vuex.Store(store),
  router,
  render: h => h(App)
})
