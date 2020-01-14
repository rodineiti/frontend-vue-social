<template>
	<span>
		<div class="card-image" v-if="img && img != '#'">
			<a v-if="link && link != '#'" :href="link" target="_blank">
			<img :src="img">
			<span class="card-title black">{{titulo || ''}}</span>
			</a>
			<span v-if="!link || link == '#'">
				<img :src="img">
				<span class="card-title black">{{titulo || ''}}</span>
			</span>
		</div>
		<div class="card-content">
			<span v-if="!img || img == '#'">
				<h4 class="black-text">{{titulo || ''}}</h4>
			</span>
			<p class="black-text">{{texto}}</p>
			<p v-if="link && link != '#'">
				<a :href="link" target="_blank">Confirma aqui...</a>
			</p>
		</div>
	</span>
</template>

<script>

	export default {
		name: 'CardDetalheVue',
		props: ['img','titulo','texto','link'],
		data () {
			return {

			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
