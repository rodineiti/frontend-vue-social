<template>

	<site-template>
		
		<span slot="menuesquerdo">
			<img class="responsive-img" :src="image">
		</span>

		<span slot="principal">

			<span>
				<h2>Perfil</h2>
				<input type="text" placeholder="Nome" v-model="form.name">
				<input type="text" placeholder="E-mail" v-model="form.email">

				<div class="file-field input-field">
			      <div class="btn">
			        <span>Imagem</span>
			        <input type="file" v-on:change="uploadImagem">
			      </div>
			      <div class="file-path-wrapper">
			        <input class="file-path validate" type="text">
			      </div>
			    </div>

				<input type="password" placeholder="Senha" v-model="form.password">
				<input type="password" placeholder="Confirmar Senha" v-model="form.password_confirmation">
				<button type="button" class="btn" @click="update()">Enviar</button>
			</span>

		</span>

	</site-template>
</template>

<script>

	import SiteTemplate from '@/templates/SiteTemplate'
	
	export default {
		name: 'Perfil',
		data () {
			return {
				form: {
					name: '',
					email: '',
					password: '',
					password_confirmation: ''
				},
				image: ''
			}
		},
		mounted() {
			this.profile()
		},
		components: {
			SiteTemplate
		},
		methods: {
			profile() {
				this.$http.get(this.$urlApi + `/api/v1/profile`, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
    				.then((response) => {
    					if (response.data.status === 'success') {
    						this.form.name = response.data.data.name
    						this.form.email = response.data.data.email
    						this.image = response.data.data.image
    					}
    				})
    				.catch((err) => {
    					console.log(err);
      					alert('Erro ao resgatar dados do perfil');
    				})
			},
			update() {
				let body = {
					name: this.form.name,
					email: this.form.email,
					password: this.form.password,
					password_confirmation: this.form.password_confirmation,
					image: this.image
				};

				this.$http.put(this.$urlApi + `/api/v1/profile/update`, body, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
    				.then((response) => {
    					if (response.data.status == 'success') {
    						alert('Perfil atualizado com sucesso')
    						this.form.name = response.data.data.name
    						this.form.email = response.data.data.email
    						this.image = response.data.data.image
    						this.form.password = ''
							this.form.password_confirmation = ''
    					} else {
    						for (var key in response.data.errors) {
				              for (var index = 0; index < response.data.errors[key].length; index++) {
				               alert(response.data.errors[key][index])
				              }
				            }
				            return
    					}
    				})
    				.catch((err) => {
    					console.log(err);
      					alert('Erro na atualização do perfil')
    				})
			},
			uploadImagem(e) {
				let arquivo = e.target.files || e.dataTransfer.files
				if (!arquivo.length) {
					return;
				}

				let reader = new FileReader()
				reader.onloadend = (e) => {
					this.image = e.target.result
				}

				reader.readAsDataURL(arquivo[0])
				
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
