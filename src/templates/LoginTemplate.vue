<template>
  <span>
  	<header>
  		<nav-bar cor="blue darken-1" logo="Logo" url="/">
        <li v-if="!usuarioLogin"><router-link to="/login">Entrar</router-link></li>
        <li v-if="!usuarioLogin"><router-link to="/cadastro">Cadastro</router-link></li>
      </nav-bar>
  	</header>

  	<main>
  		<div class="container">
  			<div class="row">
  				<grid-vue tamanho="8">
  					<card-menu-vue>
			        	<slot name="menuesquerdo" />
			    	</card-menu-vue>
  				</grid-vue>
  				<grid-vue tamanho="4">
  					<slot name="principal" />
  				</grid-vue>
  			</div>
  		</div>
  	</main>

    <footer-vue cor="blue" logo="Logo" descricao="Teste descricao" ano="2018">
    	<li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
      
    </footer-vue>
  </span>
</template>

<script>

import NavBar from '@/components/layouts/NavBar.vue'
import FooterVue from '@/components/layouts/FooterVue.vue'
import GridVue from '@/components/layouts/GridVue.vue'
import CardMenuVue from '@/components/layouts/CardMenuVue.vue'

export default {
  name: 'LoginTemplate',
  data () {
      return {
        usuarioLogin: false
      }
  },
  components: {
  	NavBar,
  	FooterVue,
  	GridVue,
  	CardMenuVue
  },
  created() {
    let usuarioSession = this.$store.getters.getUsuarioToken
    if (usuarioSession) {
      this.usuarioLogin = this.$store.getters.getUsuarioToken
      this.$router.push('/') // $router variavel global do sistema de rotas do vuejs que pode ser utilizando em qualquer componente
    } else {
      this.usuarioLogin = false
    }
  }
}
</script>

<style>

</style>
