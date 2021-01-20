<template>
	<div id="app">
		<div class="catalog">
			<div class="container">
				<div class="breadcrumbs">
					<a href="#">Главная</a>
					<span>/</span>
					<a href="#">Системы хранения</a>
					<span>/</span>
					<a href="#" class="active">Комплекты стеллажных систем</a>
				</div>
			<h1 class="catalog__title">Комплекты стеллажных систем</h1>
			<div class="catalog__filters">
				<div class="catalog__filter">
					<div class="catalog__filter-label">Сортировать по:</div>
					<Select 
						v-if="materials.length"
						:options="byPrice"
						@change="changePriceSortHandler"
					/>
				</div>
				<div class="catalog__filter">
					<div class="catalog__filter-label">Материал</div>
					<Select 
						v-if="materials.length"
						:options="materials"
						@change="changeMaterialHandler"
					/>
				</div>
			</div>
			<div class="catalog__items" v-if="products.length">
				<CatalogItem
					v-for="p in filteredProducts"
					:key="p.id"
					:product="p"
				/>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Multiselect from 'vue-multiselect'
import CatalogItem from '@/components/CatalogItem'
import Select from '@/components/Select'

export default {
	name: 'App',
	data() {
		return {
			priceSort: 'ascending',
			materialId: 2,
			byPrice: [
				{name: 'Цена по возрастанию', id: 'ascending'},
				{name: 'Цена по убыванию', id: 'descending'},
			],
			catalogKey: Date.now()
		}
	},
	components: {
		CatalogItem, Multiselect, Select
	},
	computed: {
		...mapGetters(['products', 'materials']),
		filteredProducts() {
			return this.products.filter(p => {
				return +p.material === +this.materialId
			}).sort((a, b) => {
				return this.priceSort === 'ascending' ? 
				a.price['current_price'] - b.price['current_price'] :
				b.price['current_price'] - a.price['current_price']
			})
		}
	},
	methods: {
		changeMaterialHandler(id) {
			this.materialId = id
		},
		changePriceSortHandler(id) {
			this.priceSort = id
		}
	},
	async beforeMount() {
		await this.$store.dispatch('fetchProducts')
		await this.$store.dispatch('fetchMaterials')
	},
}
</script>

<style lang="scss">
	@import '~normalize.css/normalize.css';
	@import '~vue-multiselect/dist/vue-multiselect.min.css';
	@import 'assets/scss/fonts';
	@import 'assets/scss/style';

	#app {
		padding-top: 32px;
	}

	.breadcrumbs {
		margin-bottom: 32px;
		color: #828282;
		font-size: 16px;
		line-height: 16px;

		a {
			font-size: 16px;
			line-height: 16px;
			color: #828282;
			letter-spacing: 0.05em;

			&.active {color: #000;}
		}
		span {
			margin: 0 15px;
		}
	}
	.catalog__title {
		margin-bottom: 32px;
		font-size: 36px;
		font-weight: 600;
		line-height: 48px;
	}
	.catalog__filters {
		margin-bottom: 41px;
	}
	.catalog__filter {
		display: inline-block;
		width: 288px;

		&:first-child {
			margin-right: 24px;
		}
	}
	.catalog__filter-label {
		padding-left: 16px;
		margin-bottom: 6px;
		font-size: 12px;
		line-height: 150%;
		color: #4F4F4F;
		letter-spacing: 0.03em;
	}
	.catalog__items {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(336px, 1fr));
		grid-row-gap: 40px;
		grid-column-gap: 48px;
		margin-bottom: 100px;
	}
	@media (max-width: 640px) {
		.catalog__filter {
			width: 100%;

			&:first-child{margin-bottom: 20px;}
		}
		.catalog__items{
			grid-template-columns: 1fr;
		}
	}
</style>
