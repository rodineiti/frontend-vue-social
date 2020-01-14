<template>
	<span>
		<div class="row">
	        <grid-vue class="input-field" tamanho="12">
	        	<input type="text" v-model="conteudo.title" placeholder="Titulo">
	        </grid-vue>
	        <grid-vue v-if="conteudo.title" class="input-field" tamanho="12">
	        	<textarea class="materialize-textarea" v-model="conteudo.text" placeholder="Conteúdo"></textarea>
	        </grid-vue>
	        <grid-vue v-if="conteudo.title && conteudo.text"class="input-field" tamanho="12">
	        	<input type="text" v-model="conteudo.link" placeholder="Link">
	        </grid-vue>
	        <grid-vue v-if="conteudo.title && conteudo.text"class="input-field" tamanho="12">
	        	<input type="text" v-model="conteudo.image" placeholder="Imagem">
	        </grid-vue>
	        <p class="right-align">
	        	<button @click="store()" v-if="conteudo.title && conteudo.text" class="btn waves-effect">Publicar</button>
	        </p>
	  	</div>
	</span>
</template>

<script>

	import GridVue from '@/components/layouts/GridVue'

	export default {
		name: 'PublicarConteudoVue',
		props: [],
		data () {
			return {
				conteudo: {
					title: '',
					text: '',
					link: '',
					image: ''
				}
			}
		},
		components: {
			GridVue
		},
		methods: {
			store() {
				this.$http.post(this.$urlApi + `/api/v1/contents/store`, this.conteudo, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
    				.then((response) => {
						if (response.data.status == 'success') {
    						//alert('Conteúdo adicionado com sucesso')
    						this.conteudo = {
    							title: '',
								text: '',
								link: '',
								image: ''
    						}
    						this.$store.commit('setPaginacaoConteudosLinhaTempo', response.data.data.data)
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
      					alert('Erro no servidor ao salvar conteúdo');
    				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
