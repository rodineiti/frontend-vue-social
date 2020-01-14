<template>

	<login-template>
		
		<span slot="menuesquerdo">
			<img class="responsive-img" src="https://via.placeholder.com/768x432/2196F3/00000?text=Social">
		</span>

		<span slot="principal">

			<span>
				<h2>Cadastro</h2>
				<input type="text" placeholder="Nome" v-model="form.name">
				<input type="text" placeholder="E-mail" v-model="form.email">
				<input type="password" placeholder="Senha" v-model="form.password">
				<input type="password" placeholder="Confirmar Senha" v-model="form.password_confirmation">
				<button type="button" class="btn" @click="register()">Enviar</button>
				<router-link class="btn orange" to="/login">Já tenho conta</router-link>
			</span>

		</span>

	</login-template>
</template>

<script>

	import LoginTemplate from '@/templates/LoginTemplate'
	
	export default {
		name: 'Cadastro',
		data () {
			return {
				form: {
					name: '',
					email: '',
					password: '',
					password_confirmation: ''
				}
			}
		},
		components: {
			LoginTemplate
		},
		methods: {
			register() {
				let body = {
					name: this.form.name,
					email: this.form.email,
					password: this.form.password,
					password_confirmation: this.form.password_confirmation
				};

				this.$http.post(this.$urlApi + `/api/v1/auth/register`, body)
    				.then((response) => {
						alert('Cadastro realizado com sucesso, faça o login')
						this.$router.push('/login') // $router variavel global do sistema de rotas do vuejs que pode ser utilizando em qualquer componente
    				})
    				.catch((err) => {
    					console.log(err);
      					alert('erro no login');
    				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
