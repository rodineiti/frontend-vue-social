<template>

	<login-template>
		
		<span slot="menuesquerdo">
			<img class="responsive-img" src="https://via.placeholder.com/768x432/2196F3/00000?text=Social">
		</span>

		<span slot="principal">

			<span>
				<h2>Login</h2>
				<input type="text" placeholder="E-mail" v-model="usuario.email">
				<input type="password" placeholder="Senha" v-model="usuario.password">
				<button type="button" class="btn" @click="login()">Entrar</button>
				<router-link class="btn orange" to="/cadastro">Cadastre-se</router-link>
			</span>

		</span>

	</login-template>
</template>

<script>

	import LoginTemplate from '@/templates/LoginTemplate'
	
	export default {
		name: 'Login',
		data () {
			return {
				usuario: {
					email: '',
					password: ''
				}
			}
		},
		components: {
			LoginTemplate
		},
		methods: {
			login() {
				let body = {
					grant_type: 'password',
					client_id: 2,
					client_secret: '3hWqysh22NZbfYUFBw7SYoA6BH5akt4ta3z2Osk2',
					username: this.usuario.email,
					password: this.usuario.password,
					scoped: ''
				};

				this.$http.post(this.$urlApi + `/oauth/token`, body)
    				.then((response) => {
    					if (response.data.access_token) {
    						this.$store.commit('setUsuarioToken', response.data)
    						sessionStorage.setItem('usuario', JSON.stringify(response.data))
    						this.$router.push('/') // $router variavel global do sistema de rotas do vuejs que pode ser utilizando em qualquer componente
    					}
    				})
    				.catch((error) => {
    					console.log(error);
      					alert('Ocorreu um erro no login, verifique suas credenciais.');
    				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
