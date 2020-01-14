<template>

	<site-template>
		
		<span slot="menuesquerdo">
			<div class="row valign-wrapper">
	            <grid-vue tamanho="4">
	            	<router-link :to="'/pagina/'+user.id+'/'+$slug(user.name,{lower: true})">
	              		<img :src="user.image" :alt="user.name" class="circle responsive-img"> <!-- notice the "circle" class -->
	              	</router-link>
	            </grid-vue>
	            <grid-vue tamanho="8">
	              <span class="black-text">
	              	<router-link :to="'/pagina/'+user.id+'/'+$slug(user.name,{lower: true})">
	                	<h5>{{user.name}}</h5>
	                </router-link>
	              </span>
	            </grid-vue>
	          </div>
		</span>

		<span slot="menuesquerdoamiigos">
			<h2>Seguindo</h2>
            <router-link 
				v-for="item in listAmigos" :key="item.id" 
				:to="'/pagina/'+item.id+'/'+$slug(item.name,{lower: true})">
            	<h5>{{item.name}}</h5>
            </router-link>
            <li v-if="!listAmigos.length">Home: Nenhum usuário</li>

            <hr>

            <h2>Seguidores</h2>
            <router-link 
				v-for="item in followers" :key="item.id" 
				:to="'/pagina/'+item.id+'/'+$slug(item.name,{lower: true})">
            	<h5>{{item.name}}</h5>
            </router-link>
            <li v-if="!followers.length">Home: Nenhum usuário</li>
		</span>

		<span slot="principal">
			<publicar-conteudo-vue />

			<card-conteudo-vue 
				:_id="item.id"
				:userid="item.user.id" 
				:perfil="item.user.image" 
				:nome="item.user.name" 
				:data="item.published_at" 
				v-for="item in listaConteudos" 
				:key="item.id" 
				:total_likes="item.total_likes" 
				:user_like_content="item.user_like_content" 
				:comments="item.comments">

				<card-detalhe-vue 
					:img="item.image"
					:titulo="item.title"
					:texto="item.text"
					:link="item.link" />

			</card-conteudo-vue>

			<button v-if="urlProximaPagina" @click="carregaPaginacao()" class="btn blue">Mais...</button>
			<!--<div v-scroll="handleScroll"></div>-->
		</span>

	</site-template>
</template>

<script>

	import SiteTemplate from '@/templates/SiteTemplate'
	import CardConteudoVue from '@/components/social/CardConteudoVue'
	import CardDetalheVue from '@/components/social/CardDetalheVue'
	import PublicarConteudoVue from '@/components/social/PublicarConteudoVue'
	import GridVue from '@/components/layouts/GridVue'
	
	export default {
		name: 'Home',
		data () {
			return {
				user: {
					id: null,
					name: '',
					image: ''
				},
				urlProximaPagina: null,
				pararScroll: false,
				listAmigos: [],
				followers: []
			}
		},
		created() {
			this.profile()
			this.conteudos()
			this.meusamigos()
		},
		mounted() {
			//this.profile()
		},
		methods: {
			profile() {
				this.$http.get(this.$urlApi + `/api/v1/profile`, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
    				.then((response) => {
    					if (response.data.status == 'success') {
    						this.user.id = response.data.data.id
    						this.user.name = response.data.data.name
    						this.user.image = response.data.data.image
    					}
    				})
    				.catch((err) => {
    					console.log(err);
      					alert('erro ao resgatar dados do perfil');
    				})
			},
			conteudos() {
				this.$http.get(this.$urlApi + `/api/v1/contents`, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
    				.then((response) => {
    					if (response.data.status == 'success') {
    						this.$store.commit('setConteudoLinhaTempo', response.data.data.data)
    						this.urlProximaPagina = response.data.data.next_page_url || null   						
    					}
    				})
    				.catch((err) => {
    					console.log(err);
      					alert('Erro ao resgatar conteúdos do usuário');
    				})
			},
			carregaPaginacao() {
				if (!this.urlProximaPagina) {
					return
				}
				this.$http.get(this.urlProximaPagina, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
    				.then((response) => {
    					if (response.data.status == 'success' && this.$route.name == "Home") {
    						this.$store.commit('setPaginacaoConteudosLinhaTempo', response.data.data.data)
    						this.urlProximaPagina = response.data.data.next_page_url || null 						
    					}
    				})
    				.catch((err) => {
    					console.log(err);
      					alert('Erro ao resgatar conteúdos do usuário');
    				})
			},
			handleScroll() {
		      	//console.log(window.scrollY)
		      	//console.log(document.body.clientHeight)
		      	if (this.pararScroll) {
		      		return
		      	}
		      	if (window.scrollY >= document.body.clientHeight - 1220) {
		      		this.pararScroll = true
		      		//this.carregaPaginacao()
		      	}
		    },
		    meusamigos() {
				this.$http.get(this.$urlApi + `/api/v1/contents/list/friends`, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
    				.then((response) => {
    					if (response.data.status == 'success') {
    						console.log(response.data.friends)
    						this.listAmigos = response.data.friends
    						this.followers = response.data.followers
    					}
    				})
    				.catch((err) => {
    					console.log(err);
      					alert('erro ao resgatar dados do perfil');
    				})
			},
		},
		components: {
			CardConteudoVue,
			CardDetalheVue,
			PublicarConteudoVue,
			SiteTemplate,
			GridVue
		},
		computed: {
			listaConteudos() {
				return this.$store.getters.getConteudoLinhaTempo
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
