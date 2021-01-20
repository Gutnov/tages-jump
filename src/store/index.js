import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import favorite from './favorite'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		products: [],
		materials: [],
	},
	mutations: {
		setMaterials(state, materials) {
			state.materials = materials
		},
		setProducts(state, products) {
			state.products = products
		}
	},
	actions: {
		async fetchProducts({commit}) {
			let res = await fetch('items.json')
			res = await res.json()
			commit('setProducts', res)
		},
		async fetchMaterials({commit}) {
			let res = await fetch('materials.json')
			res = await res.json()
			commit('setMaterials', res)
		},
		filterByPrice({commit}, type) {
			commit('sortByPrice', type)
		}
	},
	getters: {
		products: s => s.products,
		materials: s => s.materials,
	},
	modules: {
		cart, favorite
	}
})
