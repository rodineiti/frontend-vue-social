<template>
	<div class="row">
	<div class="card">
		<div class="card-content white-text">
			<div class="row valign-wrapper">
				<grid-vue tamanho="2">
					<router-link :to="'/pagina/'+userid+'/'+$slug(nome,{lower: true})">
						<img :src="perfil" :alt="nome" class="circle responsive-img"> <!-- notice the "circle" class -->
					</router-link>
				</grid-vue>
				<grid-vue tamanho="10">
					<span class="black-text">
						<router-link :to="'/pagina/'+userid+'/'+$slug(nome,{lower: true})"><strong>{{nome}}</strong></router-link> - <small>{{data}}</small>
					</span>
				</grid-vue>
			</div>
			<slot />
		</div>
		<div class="card-action">
			<p>
				<a style="cursor: pointer;" @click.prevent="curtida(_id)">
					<i class="material-icons">{{curtiu}}</i>{{countLikes}}
				</a>

				<a style="cursor: pointer;" @click.prevent="abreComentar()">
					<i class="material-icons">insert_comment</i> {{listaComentarios.length}}
				</a>				
			</p>
			<p class="right-align" v-if="exibirComentario">
				<input type="text" placeholder="Comentar" v-model="form.text">
				<button v-if="form.text" class="btn waves-effect waves-light orange" @click="salvarComentario(_id)">
					<i class="material-icons">send</i>
				</button>
			</p>
			<p v-if="exibirComentario">
				<ul class="collection">
					<li class="collection-item avatar" v-for="comment in listaComentarios" :key="comment.id">
						<img :src="comment.user.image" alt="" class="circle">
						<span class="title">{{comment.user.name}} <small> - {{comment.created_at}}</small> </span>
						<p>
							{{comment.text}}
						</p>
					</li>
				</ul>
			</p>
		</div>
	</div>
	</div>
</template>

<script>

	import GridVue from '@/components/layouts/GridVue.vue'

	export default {
		name: 'CardConteudoVue',
		props: ['_id','perfil','nome','data', 'total_likes','user_like_content', 'comments', 'userid'],
		data () {
			return {
				curtiu: this.user_like_content ? 'favorite' : 'favorite_border',
				countLikes: this.total_likes,
				exibirComentario: false,
				form: {
					text: ''
				},
				listaComentarios: this.comments || []
			}
		},
		components: {
			GridVue
		},
		methods: {
			curtida(id) {
				let url = ''
				if (this.$route.name == "Home") {
					url = '/api/v1/contents/like/'
				} else {
					url = '/api/v1/contents/like/page/'
				}
				this.$http.put(this.$urlApi + url + id, {}, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
					.then((response) => {
						this.countLikes = response.data.data
						this.$store.commit('setConteudoLinhaTempo', response.data.listContent.original.data)
						if (this.curtiu == 'favorite_border') {
							this.curtiu = 'favorite'
						} else {
							this.curtiu = 'favorite_border'
						}
					})
					.catch((error) => {
						console.log(error)
					})
			},
			abreComentar() {
				this.exibirComentario = !this.exibirComentario
			},
			salvarComentario(id) {
				if (!this.form.text) {
					return;
				}
				let url = ''
				if (this.$route.name == "Home") {
					url = '/api/v1/contents/comment/'
				} else {
					url = '/api/v1/contents/comment/page/'
				}
				this.$http.put(this.$urlApi + url + id, this.form, { "headers": { "Authorization" : "Bearer " + this.$store.getters.getUsuarioToken } })
					.then((response) => {
						this.$store.commit('setConteudoLinhaTempo', response.data.listContent.original.data)
						this.form = { text: '' }
						this.abreComentar()
					})
					.catch((error) => {
						console.log(error)
					})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
