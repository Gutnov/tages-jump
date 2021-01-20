export default {
	state: {
		cart: []
	},
	mutations: {
		addProduct(state, product) {
			state.cart = [...state.cart, product]
			localStorage.setItem('cart', JSON.stringify(state.cart));
		},
		removeProduct(state, id) {
			state.cart = state.cart.filter(p => p.id !== id)
			localStorage.setItem('cart', JSON.stringify(state.cart));
		}
	},
	actions: {
		addToCart({commit}, product) {
			commit('addProduct', product)
		},
		removeFromCart({commit}, id) {
			commit('removeProduct', id)
		}
	},
}