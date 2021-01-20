export default {
	state: {
		favorite: []
	},
	mutations: {
		addProductToFavorite(state, product) {
			state.favorite = [...state.favorite, product]
			localStorage.setItem('favorite', JSON.stringify(state.favorite));
		},
		removeProductFromFavorite(state, id) {
			state.favorite = state.favorite.filter(p => p.id !== id )
			localStorage.setItem('favorite', JSON.stringify(state.favorite));
		}
	},
	actions: {
		addToFavorite({commit}, product) {
			commit('addProductToFavorite', product)
		},
		removeFromFavorite({commit}, id) {
			commit('removeProductFromFavorite', id)
		}
	},
}