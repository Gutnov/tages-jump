<template>
	<div class="catalog-item">
		<img 
			:src="require(`@/assets/img/${product.image.url}`)"
			alt=""
		>
		<div class="catalog-item__bottom">
			<span class="catalog-item__sale" v-if="product.price.old_price">Скидка</span>
			<div class="catalog-item__info">
				<div class="catalog__item-code" v-if="product.code">{{product.code}}</div>
				<div class="catalog__item-name">{{product.name}}</div>
				<div class="catalog__item-price">
					<span v-if="product.price.old_price" class="catalog__item-price-old">
						{{Math.floor(product.price.old_price)}}₽
					</span>
					<span class="catalog__item-price-current">{{Math.floor(product.price.current_price)}}₽</span>
				</div>
			</div>
			<div class="catalog-item__buttons">
				<button v-if="!inCart" @click="addToCartHandler">
					<img src="@/assets/img/cart.svg" alt="">
				</button>
				<button v-if="inCart"  @click="removeFromCartHandler">
					<img src="@/assets/img/checked.svg" alt="">
				</button>
				<button @click="addToFavoriteHandler" v-if="!inFavorite">
					<img src="@/assets/img/heart.svg" alt="" >
				</button>
				<button
					class="catalog__item-in-favorite"
					@click="removeFromFavoriteHandler"
					v-if="inFavorite"
				>
					<img src="@/assets/img/heart-checked.svg" alt="" >
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		product: Object
	},
	data() {
		return {
			inCart: false,
			inFavorite: false
		}
	},
	methods: {
		addToCartHandler() {
			this.$store.dispatch('addToCart', this.product)
			this.inCart = true
		},
		removeFromCartHandler() {
			this.$store.dispatch('removeFromCart', this.product.id)
			this.inCart = false
		},
		addToFavoriteHandler() {
			this.$store.dispatch('addToFavorite', this.product)
			this.inFavorite = true
		},
		removeFromFavoriteHandler() {
			this.$store.dispatch('removeFromFavorite', this.product.id)
			this.inFavorite = false
		}
	}
}
</script>

<style lang="scss">
	.catalog-item {
		border: 1px solid #EEEEEE;
		position: relative;
		padding-right: 15px;
		padding-left: 12px;
		padding-top: 8px;
		padding-bottom: 10px;
		padding-right: 21px;

		&>img {
			max-width: 100%;
			object-fit: contain;
			display: block;
			margin: 0 auto;
			margin-bottom: 44px;
		}
	}
	.catalog-item__bottom {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	.catalog-item__sale {
		position: absolute;
		left: 0;
		top: 8px;
		min-height: 24px;
		padding: 0 16px;
		font-size: 14px;
		line-height: 24px;
		color: #fff;
		background: #EB5757;
	}
	.catalog__item-code {
		position: absolute;
		left: 12px;
		bottom: 68px;
		font-size: 10px;
		line-height: 140%;
		color: #888888;
		letter-spacing: 0.02em;
	}
	.catalog__item-name {
		margin-bottom: 10px;
		font-size: 16px;
		font-weight: 500;
		line-height: 140%;
		letter-spacing: 0.02em;
	}
	.catalog-item__buttons img:last-child {
		margin-left: 27px;
	}
	.catalog__item-price-old {
		font-size: 16px;
		line-height: 140%;
		text-decoration-line: line-through;
		color: #888888;
		margin-right: 9px;
	}
	.catalog__item-in-favorite img {
		width: 20px;
		height: 19px;
		object-fit: contain;
	}
</style>