<template>

	<site-template>
		
		<span slot="menuesquerdo">
			<div class="row valign-wrapper">
	            <grid-vue tamanho="4">
	            	<router-link :to="'/pagina/'+userOwner.id+'/'+$slug(userOwner.name,{lower: true})">
	              		<img :src="userOwner.image" :alt="userOwner.name" class="circle responsive-img"> <!-- notice the "circle" class -->
	              	</router-link>
	            </grid-vue>
	            <grid-vue tamanho="8">
	              <span class="black-text">
	              	<router-link :to="'/pagina/'+userOwner.id+'/'+$slug(userOwner.name,{lower: true})">
	                	<h5>{{userOwner.name}}</h5>
	                </router-link>
	                <button @click="amigo(userOwner.id)" class="btn" v-if="exibeBtnSeguir">{{textoBtn}}</button>
	              </span>
	            </grid-vue>
	          </div>
		</span>

		<span slot="menuesquerdoamiigos">
			<h2>Seguindo</h2>
			<router-link 
				v-for="item in olduserAmigos" :key="item.id" 
				:to="'/pagina/'+item.id+'/'+$slug(item.name,{lower: true})">
            	<h5>{{item.name}}</h5>
            </router-link>
            <li v-if="!olduserAmigos.length">Nenhum usuário</li>

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

	import SiteTemplate from '@/templates/SiteTemplate.vue'
	import CardConteudoVue from '@/components/social/CardConteudoVue.vue'
	import CardDetalheVue from '@/components/social/CardDetalheVue.vue'
	import PublicarConteudoVue from '@/components/social/PublicarConteudoVue.vue'
	import GridVue from '@/components/layouts/GridVue.vue'
	
	export default {
		name: 'Pagina',
		data () {
			return {
				userOwner: {
					id: null,
					name: '',
					image: ''
				},
				urlProximaPagina: null,
				pararScroll: false,
				exibeBtnSeguir: false,
				userLoggedIn: {
					id: null
				},
				olduserAmigos: [],
				friends_loggedin: [],
				textoBtn: 'Seguir',
				followers: []
			}
		},
		created() {
			this.profile()
			this.conteudosOwner()
		},
		watch: {
			'$route':'profile',
			'$route':'conteudosOwner'
		},
		methods: {
			profile() {
				this.$http.get(this.$urlApi + `/api/v1/profile`, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
    				.then((response) => {
    					if (response.data.status == 'success') {
    						console.log(response.data.data)
    						this.userLoggedIn.id = response.data.data.id
    					}
    				})
    				.catch((err) => {
    					console.log(err);
      					console.error('erro ao resgatar dados do perfil');
    				})
			},
			conteudosOwner() {
				this.$http.get(this.$urlApi + `/api/v1/contents/page/list/` + this.$route.params.id, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
    				.then((response) => {
    					if (response.data.status == 'success') {
    						this.$store.commit('setConteudoLinhaTempo', response.data.data.data)
    						this.urlProximaPagina = response.data.data.next_page_url || null  
    						this.userOwner = response.data.user
    						if (this.userOwner.id != this.userLoggedIn.id) {
    							this.exibeBtnSeguir = true
    						} else {
    							this.exibeBtnSeguir = false
    						}
    						this.amigosOlduser(this.userOwner.id)
    					}
    				})
    				.catch((err) => {
    					console.log(err);
      					console.error('Erro ao resgatar conteúdos do usuário');
    				})
			},
			carregaPaginacao() {
				if (!this.urlProximaPagina) {
					return
				}
				this.$http.get(this.urlProximaPagina, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
    				.then((response) => {
    					if (response.data.status == 'success' && this.$route.name == "Pagina") {
    						this.$store.commit('setPaginacaoConteudosLinhaTempo', response.data.data.data)
    						this.urlProximaPagina = response.data.data.next_page_url || null
    					}
    				})
    				.catch((err) => {
    					console.log(err);
      					console.error('Erro ao resgatar conteúdos do usuário');
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
		    amigo(id) {
		    	let body = {
		    		id: id
		    	}
		    	this.$http.post(this.$urlApi + `/api/v1/contents/user/friend`, body, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
    				.then((response) => {
						if (response.data.status == 'success') {
							console.log(response.data.data)
    						console.error(response.data.message)
    						this.friends_loggedin = response.data.data
    						this.followers = response.data.followers
    						this.eAmigo()
    					} else {
    						for (var key in response.data.errors) {
				              for (var index = 0; index < response.data.errors[key].length; index++) {
				               console.error(response.data.errors[key][index])
				              }
				            }
				            return
    					}
    				})
    				.catch((err) => {
    					console.log(err);
      					console.error('Erro no servidor ao salvar conteúdo');
    				})
		    },
		    amigosOlduser(id) {
				this.$http.get(this.$urlApi + `/api/v1/contents/list/friendspage/` + id, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
    				.then((response) => {
    					if (response.data.status == 'success') {
    						console.log(response.data.friends)
    						this.olduserAmigos = response.data.friends
    						this.friends_loggedin = response.data.friends_loggedin
    						this.followers = response.data.followers
    						this.eAmigo()
    					}
    				})
    				.catch((err) => {
    					console.log(err);
      					console.error('erro ao resgatar dados do perfil');
    				})
			},
			eAmigo() {
				for (let amigo of this.friends_loggedin) {
					if (amigo.id == this.userOwner.id) {
						this.textoBtn = 'Remover'
						return
					}
				}
				this.textoBtn = 'Seguir'
			}
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
